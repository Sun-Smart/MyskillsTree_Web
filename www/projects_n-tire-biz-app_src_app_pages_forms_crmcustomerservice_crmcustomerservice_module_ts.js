"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_crmcustomerservice_crmcustomerservice_module_ts"],{

/***/ 2858:
/*!********************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomerservice/crmcustomerservice.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomerserviceComponent": () => (/* binding */ crmcustomerserviceComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_crmcustomerservice_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./crmcustomerservice.component.html */ 89295);
/* harmony import */ var _service_crmcustomerservice_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/crmcustomerservice.service */ 58856);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_crmcustomerservicedetail_crmcustomerservicedetail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../pages/forms/crmcustomerservicedetail/crmcustomerservicedetail.component */ 9899);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions



//Shortcuts

//translator




//primeng services



//session,application constants




//custom fields & attachments

let crmcustomerserviceComponent = class crmcustomerserviceComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, crmcustomerservice_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.crmcustomerservice_service = crmcustomerservice_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_crmcustomerservices = false;
        this.bfilterPopulate_crmcustomerservicedetails = false;
        this.crmcustomerservice_menuactions = [];
        this.crmcustomerservicedetail_menuactions = [];
        this.customerid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.userid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_crmcustomerservicedetail_IDs = "";
        this.crmcustomerservicedetails_ID = "1";
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
        this.crmcustomerservice_Form = this.fb.group({
            pk: [null],
            serviceid: [null],
            currentdate: [null],
            currenttime: [null],
            customerid: [null],
            customeriddesc: [null],
            servicetype: [null],
            servicetypedesc: [null],
            userid: [null],
            useriddesc: [null],
            notes: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.crmcustomerservice_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.crmcustomerservice_Form.dirty && this.crmcustomerservice_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.serviceid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.serviceid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.serviceid && pkDetail) {
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
            let crmcustomerserviceid = null;
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
            this.formid = crmcustomerserviceid;
            //alert(crmcustomerserviceid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_crmcustomerservicedetails_TableConfig();
                setTimeout(() => {
                    //this.Set_crmcustomerservicedetails_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.crmcustomerservice_service.getDefaultData().then(res => {
                this.customerid_List = res.list_customerid.value;
                this.servicetype_List = res.list_servicetype.value;
                this.userid_List = res.list_userid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.crmcustomerservice_service.get_crmcustomerservices_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.crmcustomerservice_Form.markAsUntouched();
            this.crmcustomerservice_Form.markAsPristine();
        });
    }
    onSelected_customerid(customeridDetail) {
        if (customeridDetail.value && customeridDetail) {
            this.crmcustomerservice_Form.patchValue({
                customerid: customeridDetail.value,
                customeriddesc: customeridDetail.label,
            });
        }
    }
    onSelected_userid(useridDetail) {
        if (useridDetail.value && useridDetail) {
            this.crmcustomerservice_Form.patchValue({
                userid: useridDetail.value,
                useriddesc: useridDetail.label,
            });
        }
    }
    resetForm() {
        if (this.crmcustomerservice_Form != null)
            this.crmcustomerservice_Form.reset();
        this.crmcustomerservice_Form.patchValue({
            userid: this.sessionData.userid,
            useriddesc: this.sessionData.username,
        });
        setTimeout(() => {
            this.crmcustomerservicedetails_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let serviceid = this.crmcustomerservice_Form.get('serviceid').value;
        if (serviceid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.crmcustomerservice_service.delete_crmcustomerservice(serviceid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.crmcustomerservice_Form.patchValue({
            serviceid: null
        });
        if (this.formData.serviceid != null)
            this.formData.serviceid = null;
        for (let i = 0; i < this.tbl_crmcustomerservicedetails.source.length; i++) {
            this.tbl_crmcustomerservicedetails.source[i].detailid = null;
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
                    else if (key == "currentdate")
                        this.crmcustomerservice_Form.patchValue({ "currentdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "currenttime")
                        this.crmcustomerservice_Form.patchValue({ "currenttime": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
                    else if (key == "notes")
                        this.crmcustomerservice_Form.patchValue({ "notes": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.crmcustomerservice_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.crmcustomerservice_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.crmcustomerservice_Form.controls[key] != undefined) {
                                this.crmcustomerservice_Form.controls[key].disable({ onlySelf: true });
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
    customerid_onChange(evt) {
        let e = evt.value;
    }
    servicetype_onChange(evt) {
        let e = this.f.servicetype.value;
        this.crmcustomerservice_Form.patchValue({ servicetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    userid_onChange(evt) {
        let e = evt.value;
    }
    edit_crmcustomerservices() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.crmcustomerservice_service.get_crmcustomerservices_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.crmcustomerservice;
                let formproperty = res.crmcustomerservice.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.crmcustomerservice.pkcol;
                this.formid = res.crmcustomerservice.serviceid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.crmcustomerservice;
        this.formid = res.crmcustomerservice.serviceid;
        this.pkcol = res.crmcustomerservice.pkcol;
        this.bmyrecord = false;
        if (res.crmcustomerservice.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        var currenttimeTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.crmcustomerservice.currenttime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.crmcustomerservice_Form.patchValue({
            serviceid: res.crmcustomerservice.serviceid,
            currentdate: this.ngbDateParserFormatter.parse(res.crmcustomerservice.currentdate),
            currenttime: currenttimeTime,
            customerid: res.crmcustomerservice.customerid,
            customeriddesc: res.crmcustomerservice.customeriddesc,
            servicetype: res.crmcustomerservice.servicetype,
            servicetypedesc: res.crmcustomerservice.servicetypedesc,
            userid: res.crmcustomerservice.userid,
            useriddesc: res.crmcustomerservice.useriddesc,
            notes: JSON.parse(res.crmcustomerservice.notes),
            status: res.crmcustomerservice.status,
            statusdesc: res.crmcustomerservice.statusdesc,
        });
        this.crmcustomerservice_menuactions = res.crmcustomerservice_menuactions;
        this.crmcustomerservicedetail_menuactions = res.crmcustomerservicedetail_menuactions;
        this.crmcustomerservicedetails_visiblelist = res.crmcustomerservicedetails_visiblelist;
        //Child Tables if any
        this.Set_crmcustomerservicedetails_TableConfig();
        this.crmcustomerservicedetails_LoadTable(res.crmcustomerservicedetails);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.crmcustomerservice_Form.controls) {
            let val = this.crmcustomerservice_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.crmcustomerservice_Form.controls[key] != null) {
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
            if (!this.crmcustomerservice_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.crmcustomerservice_Form.getRawValue();
            obj.currentdate = new Date(this.crmcustomerservice_Form.get('currentdate').value ? this.ngbDateParserFormatter.format(this.crmcustomerservice_Form.get('currentdate').value) + '  UTC' : null);
            obj.currenttime = (this.crmcustomerservice_Form.get('currenttime').value == null ? 0 : this.crmcustomerservice_Form.get('currenttime').value.hour) + ':' + (this.crmcustomerservice_Form.get('currenttime').value == null ? 0 : this.crmcustomerservice_Form.get('currenttime').value.minute + ":00");
            if (this.crmcustomerservice_Form.get('notes').value != null)
                obj.notes = JSON.stringify(this.crmcustomerservice_Form.get('notes').value);
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
        var _a, _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.crmcustomerservice_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.crmcustomerservice_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.crmcustomerservice_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.crmcustomerservice_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.crmcustomerservice_Form.controls[key] != null) {
                            this.formData[key] = this.crmcustomerservice_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.currentdate = new Date(this.crmcustomerservice_Form.get('currentdate').value ? this.ngbDateParserFormatter.format(this.crmcustomerservice_Form.get('currentdate').value) + '  UTC' : null);
            this.formData.currenttime = (this.crmcustomerservice_Form.get('currenttime').value == null ? 0 : this.crmcustomerservice_Form.get('currenttime').value.hour) + ':' + (this.crmcustomerservice_Form.get('currenttime').value == null ? 0 : this.crmcustomerservice_Form.get('currenttime').value.minute + ":00");
            if (this.crmcustomerservice_Form.get('notes').value != null)
                this.formData.notes = JSON.stringify(this.crmcustomerservice_Form.get('notes').value);
            this.formData.Deleted_crmcustomerservicedetail_IDs = this.Deleted_crmcustomerservicedetail_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.crmcustomerservice_service.saveOrUpdate_crmcustomerservices(this.formData, (_b = (_a = this.tbl_crmcustomerservicedetails) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_crmcustomerservicedetails.source) {
                    for (let i = 0; i < this.tbl_crmcustomerservicedetails.source.data.length; i++) {
                        if (this.tbl_crmcustomerservicedetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_crmcustomerservicedetails.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.crmcustomerservice);
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
                        this.objvalues.push(res.crmcustomerservice);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.crmcustomerservice_Form.markAsUntouched();
                this.crmcustomerservice_Form.markAsPristine();
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
        this.tbl_crmcustomerservicedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
    }
    AddOrEdit_crmcustomerservicedetail(event, detailid, serviceid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_crmcustomerservicedetail_crmcustomerservicedetail_component__WEBPACK_IMPORTED_MODULE_4__.crmcustomerservicedetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, detailid, serviceid, visiblelist: this.crmcustomerservicedetails_visiblelist, hidelist: this.crmcustomerservicedetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_crmcustomerservicedetails.source.add(res[i]);
                    }
                    this.tbl_crmcustomerservicedetails.source.refresh();
                }
                else {
                    this.tbl_crmcustomerservicedetails.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_crmcustomerservicedetail(event, childID, i) {
        if (childID != null)
            this.Deleted_crmcustomerservicedetail_IDs += childID + ",";
        this.tbl_crmcustomerservicedetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_crmcustomerservicedetails_Checkbox() {
        debugger;
        if (this.tbl_crmcustomerservicedetails.source.settings['selectMode'] == 'multi')
            this.tbl_crmcustomerservicedetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_crmcustomerservicedetails.source.settings['selectMode'] = 'multi';
        this.tbl_crmcustomerservicedetails.source.initGrid();
    }
    delete_crmcustomerservicedetails_All() {
        this.tbl_crmcustomerservicedetails.source.settings['selectMode'] = 'single';
    }
    show_crmcustomerservicedetails_Filter() {
        setTimeout(() => {
            //  this.Set_crmcustomerservicedetails_TableDropDownConfig();
        });
        if (this.tbl_crmcustomerservicedetails.source.settings != null)
            this.tbl_crmcustomerservicedetails.source.settings['hideSubHeader'] = !this.tbl_crmcustomerservicedetails.source.settings['hideSubHeader'];
        this.tbl_crmcustomerservicedetails.source.initGrid();
    }
    show_crmcustomerservicedetails_InActive() {
    }
    enable_crmcustomerservicedetails_InActive() {
    }
    Set_crmcustomerservicedetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_crmcustomerservicedetails) {
            }
            this.bfilterPopulate_crmcustomerservicedetails = true;
        });
    }
    crmcustomerservicedetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_crmcustomerservicedetails_TableConfig() {
        this.crmcustomerservicedetails_settings = {
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
                custom: this.crmcustomerservicedetail_menuactions
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
                itemid: {
                    title: 'Item',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    crmcustomerservicedetails_LoadTable(crmcustomerservicedetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomerservicedetails_ID) >= 0) {
            if (this.tbl_crmcustomerservicedetails != undefined)
                this.tbl_crmcustomerservicedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
            if (this.tbl_crmcustomerservicedetails != undefined)
                this.tbl_crmcustomerservicedetails.source.load(crmcustomerservicedetails);
            if (this.tbl_crmcustomerservicedetails != undefined)
                this.tbl_crmcustomerservicedetails.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    crmcustomerservicedetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.crmcustomerservice_service.crmcustomerservicedetails.length == 0)
    {
        this.tbl_crmcustomerservicedetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new crmcustomerservicedetail();
        this.crmcustomerservice_service.crmcustomerservicedetails.push(obj);
        this.tbl_crmcustomerservicedetails.source.refresh();
        if ((this.crmcustomerservice_service.crmcustomerservicedetails.length / this.tbl_crmcustomerservicedetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_crmcustomerservicedetails.source.getPaging().page)
        {
            this.tbl_crmcustomerservicedetails.source.setPage((this.crmcustomerservice_service.crmcustomerservicedetails.length / this.tbl_crmcustomerservicedetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_crmcustomerservicedetails.source.grid.edit(this.tbl_crmcustomerservicedetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_crmcustomerservicedetails.source.data.indexOf(event.data);
    this.onDelete_crmcustomerservicedetail(event,event.data.detailid,((this.tbl_crmcustomerservicedetails.source.getPaging().page-1) *this.tbl_crmcustomerservicedetails.source.getPaging().perPage)+index);
    this.tbl_crmcustomerservicedetails.source.refresh();
    break;
    }
    }
    
    */
    crmcustomerservicedetails_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_crmcustomerservicedetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_crmcustomerservicedetail(event, event.data.detailid, this.formid);
                break;
            case 'delete':
                this.onDelete_crmcustomerservicedetail(event, event.data.detailid, ((this.tbl_crmcustomerservicedetails.source.getPaging().page - 1) * this.tbl_crmcustomerservicedetails.source.getPaging().perPage) + event.index);
                this.tbl_crmcustomerservicedetails.source.refresh();
                break;
        }
    }
    crmcustomerservicedetails_onDelete(obj) {
        let detailid = obj.data.detailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomerservice_service.delete_crmcustomerservice(detailid).then(res => this.crmcustomerservicedetails_LoadTable());
        }
    }
    onCustom_crmcustomerservicedetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "crmcustomerservicedetails");
            let formname = objbomenuaction.actionname;
        });
    }
    crmcustomerservicedetails_Paging(val) {
        debugger;
        this.tbl_crmcustomerservicedetails.source.setPaging(1, val, true);
    }
    handle_crmcustomerservicedetails_GridSelected(event) {
        this.crmcustomerservicedetails_selectedindex = this.tbl_crmcustomerservicedetails.source.findIndex(i => i.detailid === event.data.detailid);
    }
    Is_crmcustomerservicedetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomerservicedetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
crmcustomerserviceComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DialogService },
    { type: _service_crmcustomerservice_service__WEBPACK_IMPORTED_MODULE_1__.crmcustomerserviceService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_21__.NgxSpinnerService }
];
crmcustomerserviceComponent.propDecorators = {
    tbl_crmcustomerservicedetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['tbl_crmcustomerservicedetails', { static: false },] }]
};
crmcustomerserviceComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-crmcustomerservice',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_crmcustomerservice_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService]
    })
], crmcustomerserviceComponent);



/***/ }),

/***/ 75331:
/*!*****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomerservice/crmcustomerservice.module.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomerserviceModule": () => (/* binding */ crmcustomerserviceModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _crmcustomerservice_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crmcustomerservice.routing */ 20323);
/* harmony import */ var _crmcustomerservice_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crmcustomerservice.component */ 2858);






let crmcustomerserviceModule = class crmcustomerserviceModule {
};
crmcustomerserviceModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _crmcustomerservice_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_crmcustomerservice_component__WEBPACK_IMPORTED_MODULE_3__.crmcustomerserviceComponent]
    })
], crmcustomerserviceModule);



/***/ }),

/***/ 20323:
/*!******************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomerservice/crmcustomerservice.routing.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _crmcustomerservice_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crmcustomerservice.component */ 2858);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'crmcustomerservices', children: [
            { path: '', component: _crmcustomerservice_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomerserviceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _crmcustomerservice_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomerserviceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _crmcustomerservice_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomerserviceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _crmcustomerservice_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomerserviceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 9899:
/*!********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomerservicedetail/crmcustomerservicedetail.component.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomerservicedetailComponent": () => (/* binding */ crmcustomerservicedetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_crmcustomerservicedetail_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./crmcustomerservicedetail.component.html */ 60599);
/* harmony import */ var _service_crmcustomerservicedetail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/crmcustomerservicedetail.service */ 62561);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
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

let crmcustomerservicedetailComponent = class crmcustomerservicedetailComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, crmcustomerservicedetail_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.crmcustomerservicedetail_service = crmcustomerservicedetail_service;
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
        this.bfilterPopulate_crmcustomerservicedetails = false;
        this.crmcustomerservicedetail_menuactions = [];
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
        this.crmcustomerservicedetail_Form = this.fb.group({
            pk: [null],
            serviceid: [null],
            detailid: [null],
            itemid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required])],
            serialnumber: [null],
            description: [null],
            notes: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.crmcustomerservicedetail_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.crmcustomerservicedetail_Form.dirty && this.crmcustomerservicedetail_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.detailid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.detailid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.detailid && pkDetail) {
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
            let crmcustomerservicedetailid = null;
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
            this.formid = crmcustomerservicedetailid;
            //alert(crmcustomerservicedetailid);
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
            this.crmcustomerservicedetail_service.getDefaultData().then(res => {
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.crmcustomerservicedetail_service.get_crmcustomerservicedetails_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.crmcustomerservicedetail_Form.markAsUntouched();
            this.crmcustomerservicedetail_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.crmcustomerservicedetail_Form != null)
            this.crmcustomerservicedetail_Form.reset();
        this.crmcustomerservicedetail_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let detailid = this.crmcustomerservicedetail_Form.get('detailid').value;
        if (detailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.crmcustomerservicedetail_service.delete_crmcustomerservicedetail(detailid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.crmcustomerservicedetail_Form.patchValue({
            detailid: null
        });
        if (this.formData.detailid != null)
            this.formData.detailid = null;
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
                    else if (key == "notes")
                        this.crmcustomerservicedetail_Form.patchValue({ "notes": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.crmcustomerservicedetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.crmcustomerservicedetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.crmcustomerservicedetail_Form.controls[key] != undefined) {
                                this.crmcustomerservicedetail_Form.controls[key].disable({ onlySelf: true });
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
    edit_crmcustomerservicedetails() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.crmcustomerservicedetail_service.get_crmcustomerservicedetails_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.crmcustomerservicedetail;
                let formproperty = res.crmcustomerservicedetail.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.crmcustomerservicedetail.pkcol;
                this.formid = res.crmcustomerservicedetail.detailid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.crmcustomerservicedetail;
        this.formid = res.crmcustomerservicedetail.detailid;
        this.pkcol = res.crmcustomerservicedetail.pkcol;
        this.bmyrecord = false;
        if (res.crmcustomerservicedetail.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.crmcustomerservicedetail_Form.patchValue({
            serviceid: res.crmcustomerservicedetail.serviceid,
            detailid: res.crmcustomerservicedetail.detailid,
            itemid: res.crmcustomerservicedetail.itemid,
            serialnumber: res.crmcustomerservicedetail.serialnumber,
            description: res.crmcustomerservicedetail.description,
            notes: JSON.parse(res.crmcustomerservicedetail.notes),
            status: res.crmcustomerservicedetail.status,
            statusdesc: res.crmcustomerservicedetail.statusdesc,
        });
        this.crmcustomerservicedetail_menuactions = res.crmcustomerservicedetail_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.crmcustomerservicedetail_Form.controls) {
            let val = this.crmcustomerservicedetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.crmcustomerservicedetail_Form.controls[key] != null) {
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
            if (!this.crmcustomerservicedetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.crmcustomerservicedetail_Form.getRawValue();
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.crmcustomerservicedetail_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.crmcustomerservicedetail_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.crmcustomerservicedetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.crmcustomerservicedetail_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.crmcustomerservicedetail_Form.controls[key] != null) {
                            this.formData[key] = this.crmcustomerservicedetail_Form.controls[key].value;
                        }
                    }
                }
            }
            if (this.crmcustomerservicedetail_Form.get('notes').value != null)
                this.formData.notes = JSON.stringify(this.crmcustomerservicedetail_Form.get('notes').value);
            console.log(this.formData);
            this.spinner.show();
            this.crmcustomerservicedetail_service.saveOrUpdate_crmcustomerservicedetails(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.crmcustomerservicedetail);
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
                        this.objvalues.push(res.crmcustomerservicedetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.crmcustomerservicedetail_Form.markAsUntouched();
                this.crmcustomerservicedetail_Form.markAsPristine();
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
crmcustomerservicedetailComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_11__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_13__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__.DialogService },
    { type: _service_crmcustomerservicedetail_service__WEBPACK_IMPORTED_MODULE_1__.crmcustomerservicedetailService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
crmcustomerservicedetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-crmcustomerservicedetail',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_crmcustomerservicedetail_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_13__.KeyboardShortcutsService]
    })
], crmcustomerservicedetailComponent);



/***/ }),

/***/ 58856:
/*!*******************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/crmcustomerservice.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomerserviceService": () => (/* binding */ crmcustomerserviceService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let crmcustomerserviceService = class crmcustomerserviceService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_crmcustomerservices(formData, crmcustomerservicedetails) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { crmcustomerservicedetails: crmcustomerservicedetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservice', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservice' + '/getdefaultdata').toPromise();
        }
    }
    get_crmcustomerservices_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservice').toPromise();
        }
    }
    getListBy_serviceid(serviceid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservice' + '/serviceid/' + serviceid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservice' + '/param/' + key).toPromise();
        }
    }
    get_crmcustomerservices_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservice' + '/e/' + id).toPromise();
        }
    }
    get_crmcustomerservices_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservice' + '/' + id).toPromise();
        }
    }
    delete_crmcustomerservice(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservice' + '/' + id).toPromise();
        }
    }
    getList_customerid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomerservice' + '/getList_customerid').toPromise();
    }
    getList_servicetype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomerservice' + '/getList_servicetype/').toPromise();
    }
    getList_userid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomerservice' + '/getList_userid').toPromise();
    }
};
crmcustomerserviceService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
crmcustomerserviceService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], crmcustomerserviceService);



/***/ }),

/***/ 62561:
/*!*************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/crmcustomerservicedetail.service.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomerservicedetailService": () => (/* binding */ crmcustomerservicedetailService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let crmcustomerservicedetailService = class crmcustomerservicedetailService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_crmcustomerservicedetails(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservicedetail', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/getdefaultdata').toPromise();
        }
    }
    get_crmcustomerservicedetails_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservicedetail').toPromise();
        }
    }
    getListBy_detailid(detailid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/detailid/' + detailid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/param/' + key).toPromise();
        }
    }
    get_crmcustomerservicedetails_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/e/' + id).toPromise();
        }
    }
    get_crmcustomerservicedetails_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/' + id).toPromise();
        }
    }
    delete_crmcustomerservicedetail(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/' + id).toPromise();
        }
    }
};
crmcustomerservicedetailService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
crmcustomerservicedetailService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], crmcustomerservicedetailService);



/***/ }),

/***/ 89295:
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/crmcustomerservice/crmcustomerservice.component.html ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"crmcustomerservice_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Customer Services' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_crmcustomerservices()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of crmcustomerservice_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.serviceid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.serviceid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('currentdate') == -1) && (currentdatevisible==undefined || currentdatevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"currentdate\" class=\"control-label\">Current Date</label>\r\n                <label *ngIf=\"showview\"\r\n                  class=\"labelview\">{{ngbDateParserFormatter.format(f.currentdate?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #currentdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"currentdateformpicker\"\r\n                    id=\"currentdate\" formControlName=\"currentdate\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"currentdateformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('currenttime') == -1) && (currenttimevisible==undefined || currenttimevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"currenttime\" class=\"control-label\">Current Time</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.currenttime?.value}}</label>\r\n                <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"currenttime\">\r\n                </ngb-timepicker>\r\n              </div>\r\n\r\n\r\n              <!--customerid-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('customerid') == -1) && (customeridvisible==undefined || customeridvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"customerid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_customerid(null)\">Customer</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"customerid_List\" [optionsEvent]=\"customerid_optionsEvent\"\r\n                  [form]=\"crmcustomermaster\" (selectItem)=\"onSelected_customerid($event)\" [reportid]='pofgf'\r\n                  [menuid]='pofgf' formControlName=\"customerid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.customeriddesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--servicetype-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('servicetype') == -1) && (servicetypevisible==undefined || servicetypevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"servicetype\" class=\"control-label\">Service Type</label>\r\n                <select *ngIf=\"!showview\" id=\"servicetype\" (change)=\"servicetype_onChange($event.target)\"\r\n                  formControlName=\"servicetype\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of servicetype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.servicetypedesc?.value}}</label>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <!--userid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('userid') == -1) && (useridvisible==undefined || useridvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"userid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_userid(null)\">User</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"userid_List\" [optionsEvent]=\"userid_optionsEvent\"\r\n                  [form]=\"bousermaster\" (selectItem)=\"onSelected_userid($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                  formControlName=\"userid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.useriddesc?.value}}</label>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('notes') == -1) && (notesvisible==undefined || notesvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"notes\" class=\"control-label\">Notes</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.notes?.value}}</label>\r\n                <app-comment *ngIf=\"!showview\" id=\"notes\" formControlName=\"notes\" [label]=\"'Notes'\">\r\n                </app-comment>\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Customer Service Details</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table crmcustomerservicedetails-->\r\n            <div [ngClass]=\"Is_crmcustomerservicedetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Customer Service Details' | translate}}\r\n                <select class='child' id=\"crmcustomerservicedetailsPagingdropdown\"\r\n                  (change)=\"crmcustomerservicedetails_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"crmcustomerservicedetailtoggleOption();crmcustomerservicedetails_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showcrmcustomerservicedetailsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"crmcustomerservicedetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_crmcustomerservicedetails\r\n                (userRowSelect)=\"handle_crmcustomerservicedetails_GridSelected($event)\"\r\n                [settings]=\"crmcustomerservicedetails_settings\"\r\n                (custom)=\"onCustom_crmcustomerservicedetails_Action($event)\"\r\n                [source]=\"tbl_crmcustomerservicedetails?.source?.data\"\r\n                (delete)=\"crmcustomerservicedetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"crmcustomerservicedetails_route($event,'delete')\"\r\n                (create)=\"crmcustomerservicedetails_route($event,'create')\"\r\n                (createConfirm)=\"crmcustomerservicedetails_beforesave($event)\"\r\n                (edit)=\"crmcustomerservicedetails_route($event,'edit')\"\r\n                (editConfirm)=\"crmcustomerservicedetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table crmcustomerservicedetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 60599:
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/crmcustomerservicedetail/crmcustomerservicedetail.component.html ***!
  \*************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"crmcustomerservicedetail_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Customer Service Details' |\r\n        translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_crmcustomerservicedetails()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of crmcustomerservicedetail_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.detailid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.detailid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('serviceid') == -1) && (serviceidvisible==undefined || serviceidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"serviceid\" class=\"control-label\">Service</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.serviceid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"serviceid\" formControlName=\"serviceid\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('itemid') == -1) && (itemidvisible==undefined || itemidvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"itemid\" class=\"control-label required\">Item</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.itemid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"itemid\" required formControlName=\"itemid\" (change)=\"itemid_onChange($event.target)\"\r\n          class=\"form-control\">\r\n        <app-field-error-display [displayError]=\"f.itemid.errors?.required\" errorMsg=\"Enter {{'Item' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('serialnumber') == -1) && (serialnumbervisible==undefined || serialnumbervisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"serialnumber\" class=\"control-label\">Serial Number</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.serialnumber?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"serialnumber\" formControlName=\"serialnumber\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('description') == -1) && (descriptionvisible==undefined || descriptionvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"description\" class=\"control-label\">Description</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.description?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"description\"\r\n          formControlName=\"description\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('notes') == -1) && (notesvisible==undefined || notesvisible==true)) && maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"notes\" class=\"control-label\">Notes</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.notes?.value}}</label>\r\n        <app-comment *ngIf=\"!showview\" id=\"notes\" formControlName=\"notes\" [label]=\"'Notes'\">\r\n        </app-comment>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_crmcustomerservice_crmcustomerservice_module_ts.js.map