"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_lmscorporatesecondarycontact_lmscorporate-dbdc2c"],{

/***/ 18248:
/*!****************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.component.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscorporatesecondarycontactComponent": () => (/* binding */ lmscorporatesecondarycontactComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscorporatesecondarycontact_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmscorporatesecondarycontact.component.html */ 99164);
/* harmony import */ var _service_lmscorporatesecondarycontact_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmscorporatesecondarycontact.service */ 82003);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
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

let lmscorporatesecondarycontactComponent = class lmscorporatesecondarycontactComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmscorporatesecondarycontact_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmscorporatesecondarycontact_service = lmscorporatesecondarycontact_service;
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
        this.bfilterPopulate_lmscorporatesecondarycontacts = false;
        this.lmscorporatesecondarycontact_menuactions = [];
        this.branchid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
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
        this.lmscorporatesecondarycontact_Form = this.fb.group({
            pk: [null],
            branchid: [null],
            branchiddesc: [null],
            leadid: [null],
            secondarycontactid: [null],
            firstname: [null],
            lastname: [null],
            companyname: [null],
            designation: [null],
            designationdesc: [null],
            category: [null],
            categorydesc: [null],
            groupname: [null],
            groupnamedesc: [null],
            mobile: [null],
            officephone: [null],
            extension: [null],
            residencephone: [null],
            emailid: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmscorporatesecondarycontact_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmscorporatesecondarycontact_Form.dirty && this.lmscorporatesecondarycontact_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_8__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_8__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_8__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.secondarycontactid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.secondarycontactid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.secondarycontactid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
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
            let lmscorporatesecondarycontactid = null;
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
            this.formid = lmscorporatesecondarycontactid;
            //alert(lmscorporatesecondarycontactid);
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
            this.lmscorporatesecondarycontact_service.getDefaultData().then(res => {
                this.branchid_List = res.list_branchid.value;
                this.designation_List = res.list_designation.value;
                this.category_List = res.list_category.value;
                this.groupname_List = res.list_groupname.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmscorporatesecondarycontact_service.get_lmscorporatesecondarycontacts_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmscorporatesecondarycontact_Form.markAsUntouched();
            this.lmscorporatesecondarycontact_Form.markAsPristine();
        });
    }
    onSelected_branchid(branchidDetail) {
        if (branchidDetail.value && branchidDetail) {
            this.lmscorporatesecondarycontact_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.lmscorporatesecondarycontact_Form != null)
            this.lmscorporatesecondarycontact_Form.reset();
        this.lmscorporatesecondarycontact_Form.patchValue({
            branchid: this.sessionData.branchid,
            branchiddesc: this.sessionData.branchiddesc,
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let secondarycontactid = this.lmscorporatesecondarycontact_Form.get('secondarycontactid').value;
        if (secondarycontactid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmscorporatesecondarycontact_service.delete_lmscorporatesecondarycontact(secondarycontactid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmscorporatesecondarycontact_Form.patchValue({
            secondarycontactid: null
        });
        if (this.formData.secondarycontactid != null)
            this.formData.secondarycontactid = null;
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
                        this.lmscorporatesecondarycontact_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmscorporatesecondarycontact_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmscorporatesecondarycontact_Form.controls[key] != undefined) {
                                this.lmscorporatesecondarycontact_Form.controls[key].disable({ onlySelf: true });
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
    branchid_onChange(evt) {
        let e = evt.value;
    }
    designation_onChange(evt) {
        let e = evt.value;
        this.lmscorporatesecondarycontact_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
    }
    category_onChange(evt) {
        let e = this.f.category.value;
        this.lmscorporatesecondarycontact_Form.patchValue({ categorydesc: evt.options[evt.options.selectedIndex].text });
    }
    groupname_onChange(evt) {
        let e = this.f.groupname.value;
        this.lmscorporatesecondarycontact_Form.patchValue({ groupnamedesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_lmscorporatesecondarycontacts() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmscorporatesecondarycontact_service.get_lmscorporatesecondarycontacts_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmscorporatesecondarycontact;
                let formproperty = res.lmscorporatesecondarycontact.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmscorporatesecondarycontact.pkcol;
                this.formid = res.lmscorporatesecondarycontact.secondarycontactid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmscorporatesecondarycontact;
        this.formid = res.lmscorporatesecondarycontact.secondarycontactid;
        this.pkcol = res.lmscorporatesecondarycontact.pkcol;
        this.bmyrecord = false;
        if (res.lmscorporatesecondarycontact.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmscorporatesecondarycontact_Form.patchValue({
            branchid: res.lmscorporatesecondarycontact.branchid,
            branchiddesc: res.lmscorporatesecondarycontact.branchiddesc,
            leadid: res.lmscorporatesecondarycontact.leadid,
            secondarycontactid: res.lmscorporatesecondarycontact.secondarycontactid,
            firstname: res.lmscorporatesecondarycontact.firstname,
            lastname: res.lmscorporatesecondarycontact.lastname,
            companyname: res.lmscorporatesecondarycontact.companyname,
            designation: res.lmscorporatesecondarycontact.designation,
            designationdesc: res.lmscorporatesecondarycontact.designationdesc,
            category: res.lmscorporatesecondarycontact.category,
            categorydesc: res.lmscorporatesecondarycontact.categorydesc,
            groupname: res.lmscorporatesecondarycontact.groupname,
            groupnamedesc: res.lmscorporatesecondarycontact.groupnamedesc,
            mobile: res.lmscorporatesecondarycontact.mobile,
            officephone: res.lmscorporatesecondarycontact.officephone,
            extension: res.lmscorporatesecondarycontact.extension,
            residencephone: res.lmscorporatesecondarycontact.residencephone,
            emailid: res.lmscorporatesecondarycontact.emailid,
            status: res.lmscorporatesecondarycontact.status,
            statusdesc: res.lmscorporatesecondarycontact.statusdesc,
        });
        this.lmscorporatesecondarycontact_menuactions = res.lmscorporatesecondarycontact_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmscorporatesecondarycontact_Form.controls) {
            let val = this.lmscorporatesecondarycontact_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmscorporatesecondarycontact_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.lmscorporatesecondarycontact_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.lmscorporatesecondarycontact_Form.getRawValue();
            console.log(obj);
            if (!confirm('Do you want to want to save?')) {
                return;
            }
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.lmscorporatesecondarycontact_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmscorporatesecondarycontact_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmscorporatesecondarycontact_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmscorporatesecondarycontact_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmscorporatesecondarycontact_Form.controls[key] != null) {
                            this.formData[key] = this.lmscorporatesecondarycontact_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.lmscorporatesecondarycontact_service.saveOrUpdate_lmscorporatesecondarycontacts(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmscorporatesecondarycontact);
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
                        this.objvalues.push(res.lmscorporatesecondarycontact);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmscorporatesecondarycontact_Form.markAsUntouched();
                this.lmscorporatesecondarycontact_Form.markAsPristine();
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
lmscorporatesecondarycontactComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_lmscorporatesecondarycontact_service__WEBPACK_IMPORTED_MODULE_1__.lmscorporatesecondarycontactService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
lmscorporatesecondarycontactComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-lmscorporatesecondarycontact',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscorporatesecondarycontact_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], lmscorporatesecondarycontactComponent);



/***/ }),

/***/ 46154:
/*!*************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.module.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscorporatesecondarycontactModule": () => (/* binding */ lmscorporatesecondarycontactModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmscorporatesecondarycontact_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmscorporatesecondarycontact.routing */ 78040);
/* harmony import */ var _lmscorporatesecondarycontact_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmscorporatesecondarycontact.component */ 18248);






let lmscorporatesecondarycontactModule = class lmscorporatesecondarycontactModule {
};
lmscorporatesecondarycontactModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmscorporatesecondarycontact_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmscorporatesecondarycontact_component__WEBPACK_IMPORTED_MODULE_3__.lmscorporatesecondarycontactComponent]
    })
], lmscorporatesecondarycontactModule);



/***/ }),

/***/ 78040:
/*!**************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.routing.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmscorporatesecondarycontact_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmscorporatesecondarycontact.component */ 18248);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmscorporatesecondarycontacts', children: [
            { path: '', component: _lmscorporatesecondarycontact_component__WEBPACK_IMPORTED_MODULE_0__.lmscorporatesecondarycontactComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmscorporatesecondarycontact_component__WEBPACK_IMPORTED_MODULE_0__.lmscorporatesecondarycontactComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmscorporatesecondarycontact_component__WEBPACK_IMPORTED_MODULE_0__.lmscorporatesecondarycontactComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmscorporatesecondarycontact_component__WEBPACK_IMPORTED_MODULE_0__.lmscorporatesecondarycontactComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 82003:
/*!*****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmscorporatesecondarycontact.service.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscorporatesecondarycontactService": () => (/* binding */ lmscorporatesecondarycontactService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmscorporatesecondarycontactService = class lmscorporatesecondarycontactService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmscorporatesecondarycontacts(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscorporatesecondarycontact', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/getdefaultdata').toPromise();
        }
    }
    get_lmscorporatesecondarycontacts_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscorporatesecondarycontact').toPromise();
        }
    }
    getListBy_secondarycontactid(secondarycontactid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/secondarycontactid/' + secondarycontactid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/param/' + key).toPromise();
        }
    }
    get_lmscorporatesecondarycontacts_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/e/' + id).toPromise();
        }
    }
    get_lmscorporatesecondarycontacts_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/' + id).toPromise();
        }
    }
    delete_lmscorporatesecondarycontact(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/' + id).toPromise();
        }
    }
    getList_branchid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact' + '/getList_branchid').toPromise();
    }
    getList_designation() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact' + '/getList_designation').toPromise();
    }
    getList_category() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact' + '/getList_category/').toPromise();
    }
    getList_groupname() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact' + '/getList_groupname/').toPromise();
    }
};
lmscorporatesecondarycontactService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmscorporatesecondarycontactService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmscorporatesecondarycontactService);



/***/ }),

/***/ 99164:
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.component.html ***!
  \*********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmscorporatesecondarycontact_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Secondary Contacts' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmscorporatesecondarycontacts()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmscorporatesecondarycontact_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.secondarycontactid.value != null\" (afterAction)=\"afterAction($event)\"\r\n              [menuid]=\"p_menuid\" [value]=\"f.secondarycontactid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n\r\n\r\n    <!--branchid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"branchid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_branchid(null)\">Branch</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"branchid_List\" [optionsEvent]=\"branchid_optionsEvent\"\r\n          [form]=\"bouserbranchaccess\" (selectItem)=\"onSelected_branchid($event)\" [reportid]='oxubv' [menuid]='oxubv'\r\n          formControlName=\"branchid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.branchiddesc?.value}}</label>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('leadid') == -1) && (leadidvisible==undefined || leadidvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"leadid\" class=\"control-label\">Lead</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.leadid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"leadid\" formControlName=\"leadid\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('firstname') == -1) && (firstnamevisible==undefined || firstnamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"firstname\" class=\"control-label\">First Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.firstname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"firstname\" formControlName=\"firstname\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('lastname') == -1) && (lastnamevisible==undefined || lastnamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"lastname\" class=\"control-label\">Last Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.lastname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"lastname\" formControlName=\"lastname\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('companyname') == -1) && (companynamevisible==undefined || companynamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"companyname\" class=\"control-label\">Company Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.companyname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"companyname\" formControlName=\"companyname\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--designation-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('designation') == -1) && (designationvisible==undefined || designationvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"designation\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_designation(null)\">Designation</label>\r\n        <select *ngIf=\"!showview\" id=\"designation\" (change)=\"designation_onChange($event.target)\"\r\n          formControlName=\"designation\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of designation_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.designationdesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--category-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('category') == -1) && (categoryvisible==undefined || categoryvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"category\" class=\"control-label\">Category</label>\r\n        <select *ngIf=\"!showview\" id=\"category\" (change)=\"category_onChange($event.target)\" formControlName=\"category\"\r\n          class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of category_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.categorydesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--groupname-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('groupname') == -1) && (groupnamevisible==undefined || groupnamevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"groupname\" class=\"control-label\">Group</label>\r\n        <select *ngIf=\"!showview\" id=\"groupname\" (change)=\"groupname_onChange($event.target)\"\r\n          formControlName=\"groupname\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of groupname_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.groupnamedesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('mobile') == -1) && (mobilevisible==undefined || mobilevisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"mobile\" class=\"control-label\">Mobile</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.mobile?.value}}</label>\r\n        <int-phone-prefix *ngIf=\"!showview\" id=\"mobile\" formControlName=\"mobile\" [locale]=\"'en'\"\r\n          class=\"form-control telephone\">\r\n        </int-phone-prefix>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('officephone') == -1) && (officephonevisible==undefined || officephonevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"officephone\" class=\"control-label\">Office Phone</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.officephone?.value}}</label>\r\n        <int-phone-prefix *ngIf=\"!showview\" id=\"officephone\" formControlName=\"officephone\" [locale]=\"'en'\"\r\n          [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n        </int-phone-prefix>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('extension') == -1) && (extensionvisible==undefined || extensionvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"extension\" class=\"control-label\">Extension</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.extension?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"extension\" formControlName=\"extension\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('residencephone') == -1) && (residencephonevisible==undefined || residencephonevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"residencephone\" class=\"control-label\">Residence Phone</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.residencephone?.value}}</label>\r\n        <int-phone-prefix *ngIf=\"!showview\" id=\"residencephone\" formControlName=\"residencephone\" [locale]=\"'en'\"\r\n          [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n        </int-phone-prefix>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('emailid') == -1) && (emailidvisible==undefined || emailidvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"emailid\" class=\"control-label\">Email</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.emailid?.value}}</label>\r\n        <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"emailid\" formControlName=\"emailid\"\r\n          class=\"form-control\">\r\n        <app-field-error-display [displayError]=\"f.emailid.errors!=null && f.emailid.errors?.email\"\r\n          errorMsg=\"Enter valid email\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_lmscorporatesecondarycontact_lmscorporate-dbdc2c.js.map