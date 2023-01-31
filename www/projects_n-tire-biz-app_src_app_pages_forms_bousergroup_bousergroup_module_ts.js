"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_bousergroup_bousergroup_module_ts"],{

/***/ 6450:
/*!******************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bousergroup/bousergroup.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bousergroupComponent": () => (/* binding */ bousergroupComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bousergroup_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bousergroup.component.html */ 17511);
/* harmony import */ var _service_bousergroup_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bousergroup.service */ 54989);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _service_bousergroupaccess_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../service/bousergroupaccess.service */ 42969);
/* harmony import */ var _bousermaster_bousermaster_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../bousermaster/bousermaster.component */ 80717);
/* harmony import */ var _service_bousermaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/bousermaster.service */ 17272);
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



//Shortcuts

//translator






//primeng services



//session,application constants




//custom fields & attachments


let bousergroupComponent = class bousergroupComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bousergroup_service, bousermaster_service, bousergroupaccess_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bousergroup_service = bousergroup_service;
        this.bousermaster_service = bousermaster_service;
        this.bousergroupaccess_service = bousergroupaccess_service;
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
        this.bfilterPopulate_bousergroups = false;
        this.bfilterPopulate_bousergroupaccesses = false;
        this.bousergroup_menuactions = [];
        this.Insertbousergroupaccesses = [];
        this.bousergroupaccess_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_10__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_10__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_bousergroupaccess_IDs = "";
        this.bousergroupaccesses_ID = "1";
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
        this.bousergroup_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            usergroupid: [null],
            groupname: [null],
            notes: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bousergroup_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bousergroup_Form.dirty && this.bousergroup_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.usergroupid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.usergroupid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.usergroupid && pkDetail) {
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
            let bousergroupid = null;
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
            this.formid = bousergroupid;
            //alert(bousergroupid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bousergroupaccesses_TableConfig();
                setTimeout(() => {
                    //this.Set_bousergroupaccesses_TableDropDownConfig();
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
            this.bousergroup_service.getDefaultData().then(res => {
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bousergroup_service.get_bousergroups_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bousergroup_Form.markAsUntouched();
            this.bousergroup_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bousergroup_Form != null)
            this.bousergroup_Form.reset();
        this.bousergroup_Form.patchValue({});
        setTimeout(() => {
            this.Insertbousergroupaccesses = [];
            this.bousergroupaccesses_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let usergroupid = this.bousergroup_Form.get('usergroupid').value;
        if (usergroupid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bousergroup_service.delete_bousergroup(usergroupid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bousergroup_Form.patchValue({
            usergroupid: null
        });
        if (this.formData.usergroupid != null)
            this.formData.usergroupid = null;
        for (let i = 0; i < this.tbl_bousergroupaccesses.source.length; i++) {
            this.tbl_bousergroupaccesses.source[i].accessid = null;
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
                    else if (ctrltype == "string") {
                        this.bousergroup_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bousergroup_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bousergroup_Form.controls[key] != undefined) {
                                this.bousergroup_Form.controls[key].disable({ onlySelf: true });
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
            return this.customfieldservice.getcustomfieldconfigurationsByTable("bousergroups", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.groupname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.groupname != null) {
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
    edit_bousergroups() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bousergroup_service.get_bousergroups_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bousergroup;
                let formproperty = res.bousergroup.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bousergroup.pkcol;
                this.formid = res.bousergroup.usergroupid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bousergroup;
        this.formid = res.bousergroup.usergroupid;
        this.pkcol = res.bousergroup.pkcol;
        this.bmyrecord = false;
        if (res.bousergroup.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bousergroup_Form.patchValue({
            usergroupid: res.bousergroup.usergroupid,
            groupname: res.bousergroup.groupname,
            notes: res.bousergroup.notes,
            customfield: res.bousergroup.customfield,
            attachment: JSON.parse(res.bousergroup.attachment),
            status: res.bousergroup.status,
            statusdesc: res.bousergroup.statusdesc,
        });
        this.bousergroup_menuactions = res.bousergroup_menuactions;
        this.bousergroupaccess_menuactions = res.bousergroupaccess_menuactions;
        this.bousergroupaccesses_visiblelist = res.bousergroupaccesses_visiblelist;
        if (this.bousergroup_Form.get('customfield').value != null && this.bousergroup_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.bousergroup_Form.get('customfield').value);
        this.FillCustomField();
        if (this.bousergroup_Form.get('attachment').value != null && this.bousergroup_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.bousergroup_Form.get('attachment').value);
        //Child Tables if any
        this.Set_bousergroupaccesses_TableConfig();
        this.bousergroupaccesses_LoadTable(res.bousergroupaccesses);
        this.Insertbousergroupaccesses = [];
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bousergroup_Form.controls) {
            let val = this.bousergroup_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bousergroup_Form.controls[key] != null) {
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
            if (!this.bousergroup_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.bousergroup_Form.getRawValue();
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
            // Object.keys(this.bousergroup_Form.controls).forEach(key => {
            //   const controlErrors: ValidationErrors = this.bousergroup_Form.get(key).errors;
            //   if (controlErrors != null) {
            //     Object.keys(controlErrors).forEach(keyError => {
            //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //     });
            //   }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bousergroup_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bousergroup_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bousergroup_Form.controls[key] != null) {
                            this.formData[key] = this.bousergroup_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_bousergroupaccess_IDs = this.Deleted_bousergroupaccess_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.bousergroup_service.saveOrUpdate_bousergroups(this.formData, (_b = (_a = this.tbl_bousergroupaccesses) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, this.Insertbousergroupaccesses).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_bousergroupaccesses.source) {
                    for (let i = 0; i < this.tbl_bousergroupaccesses.source.data.length; i++) {
                        if (this.tbl_bousergroupaccesses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bousergroupaccesses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bousergroup);
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
                        this.objvalues.push(res.bousergroup);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bousergroup_Form.markAsUntouched();
                this.bousergroup_Form.markAsPristine();
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
        this.tbl_bousergroupaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bousergroupaccesses
    onCustom_bousergroupaccesses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            switch (event.action) {
                case 'viewrecord':
                    let val = event.data.pkcol;
                    this.dialog.open(_bousermaster_bousermaster_component__WEBPACK_IMPORTED_MODULE_5__.bousermasterComponent, {
                        data: { showview: false, pkcol: val, ScreenType: 2 },
                    }).onClose.subscribe(res => {
                    });
                    break;
            }
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bousergroupaccesses");
            let formname = objbomenuaction.actionname;
        });
    }
    show_bousergroupaccesses_Checkbox() {
        debugger;
        if (this.tbl_bousergroupaccesses.source.settings['selectMode'] == 'multi')
            this.tbl_bousergroupaccesses.source.settings['selectMode'] = 'single';
        else
            this.tbl_bousergroupaccesses.source.settings['selectMode'] = 'multi';
        this.tbl_bousergroupaccesses.source.initGrid();
    }
    delete_bousergroupaccesses_All() {
        this.tbl_bousergroupaccesses.source.settings['selectMode'] = 'single';
    }
    show_bousergroupaccesses_Filter() {
        setTimeout(() => {
            //  this.Set_bousergroupaccesses_TableDropDownConfig();
        });
        if (this.tbl_bousergroupaccesses.source.settings != null)
            this.tbl_bousergroupaccesses.source.settings['hideSubHeader'] = !this.tbl_bousergroupaccesses.source.settings['hideSubHeader'];
        this.tbl_bousergroupaccesses.source.initGrid();
    }
    show_bousergroupaccesses_InActive() {
    }
    enable_bousergroupaccesses_InActive() {
    }
    Set_bousergroupaccesses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bousergroupaccesses) {
                var clone = this.sharedService.clone(this.tbl_bousergroupaccesses.source.settings);
                if (clone.columns['usergroupid'] != undefined)
                    clone.columns['usergroupid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bousergroupaccesses_usergroupid.value)), }, };
                if (clone.columns['usergroupid'] != undefined)
                    clone.columns['usergroupid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bousergroupaccesses_usergroupid.value)), }, };
                this.tbl_bousergroupaccesses.source.settings = clone;
                this.tbl_bousergroupaccesses.source.initGrid();
            }
            this.bfilterPopulate_bousergroupaccesses = true;
        });
    }
    bousergroupaccesses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bousergroupaccesses_TableConfig() {
        this.bousergroupaccesses_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'multi',
            actions: {
                columnTitle: '',
                width: '300px',
                add: false,
                edit: false,
                delete: false,
                position: 'right',
                custom: [
                    { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>' }
                ],
            },
            columns: {
                accessid: {
                    title: 'Access',
                    type: '',
                },
                userid: {
                    title: 'User',
                    type: '',
                },
                usercode: {
                    title: 'Usercode',
                    type: '',
                },
                username: {
                    title: 'Username',
                    type: '',
                },
            },
        };
    }
    bousergroupaccesses_LoadTable(bousergroupaccesses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousergroupaccesses_ID) >= 0) {
            if (this.tbl_bousergroupaccesses != undefined)
                this.tbl_bousergroupaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
            if (this.tbl_bousergroupaccesses != undefined)
                this.tbl_bousergroupaccesses.source.load(bousergroupaccesses);
            setTimeout(() => {
                if (this.tbl_bousergroupaccesses.source != null) {
                    this.tbl_bousergroupaccesses.source.grid.getRows().forEach((row) => {
                        if (row.data.accessid != null && row.data.accessid != "") {
                            this.Insertbousergroupaccesses.push(row.data);
                            this.tbl_bousergroupaccesses.source.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    //external to inline
    /*
    bousergroupaccesses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bousergroup_service.bousergroupaccesses.length == 0)
    {
        this.tbl_bousergroupaccesses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bousergroupaccess();
        this.bousergroup_service.bousergroupaccesses.push(obj);
        this.tbl_bousergroupaccesses.source.refresh();
        if ((this.bousergroup_service.bousergroupaccesses.length / this.tbl_bousergroupaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bousergroupaccesses.source.getPaging().page)
        {
            this.tbl_bousergroupaccesses.source.setPage((this.bousergroup_service.bousergroupaccesses.length / this.tbl_bousergroupaccesses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bousergroupaccesses.source.grid.edit(this.tbl_bousergroupaccesses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bousergroupaccesses.source.data.indexOf(event.data);
    this.onDelete_bousergroupaccess(event,event.data.accessid,((this.tbl_bousergroupaccesses.source.getPaging().page-1) *this.tbl_bousergroupaccesses.source.getPaging().perPage)+index);
    this.tbl_bousergroupaccesses.source.refresh();
    break;
    }
    }
    
    */
    bousergroupaccesses_Paging(val) {
        debugger;
        this.tbl_bousergroupaccesses.source.setPaging(1, val, true);
    }
    handle_bousergroupaccesses_GridSelected(event) {
        debugger;
        if (event.isSelected) {
            if (event.data.accessid == null || event.data.accessid == "") {
                var obj = { usergroupid: this.formid, userid: event.data.userid };
                this.Insertbousergroupaccesses.push(obj);
            }
            else {
                var deletedids = this.Deleted_bousergroupaccess_IDs.split(',');
                let i = 0;
                deletedids.forEach(id => {
                    if (id == event.data.accessid) {
                        deletedids.splice(i, 1);
                    }
                    i++;
                });
                deletedids.join(",");
            }
        }
        else {
            if (event.data.accessid != null && event.data.accessid != "")
                this.Deleted_bousergroupaccess_IDs += event.data.accessid + ",";
        }
    }
    Is_bousergroupaccesses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousergroupaccesses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bousergroupComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_16__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_9__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DialogService },
    { type: _service_bousergroup_service__WEBPACK_IMPORTED_MODULE_1__.bousergroupService },
    { type: _service_bousermaster_service__WEBPACK_IMPORTED_MODULE_6__.bousermasterService },
    { type: _service_bousergroupaccess_service__WEBPACK_IMPORTED_MODULE_4__.bousergroupaccessService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_22__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_7__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_8__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_11__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_24__.NgxSpinnerService }
];
bousergroupComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['customform', { static: false },] }],
    tbl_bousergroupaccesses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['tbl_bousergroupaccesses', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['fileattachment', { static: false },] }]
};
bousergroupComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
        selector: 'app-bousergroup',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bousergroup_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService]
    })
], bousergroupComponent);



/***/ }),

/***/ 80777:
/*!***************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bousergroup/bousergroup.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bousergroupModule": () => (/* binding */ bousergroupModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _bousergroup_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bousergroup.routing */ 49210);
/* harmony import */ var _bousergroup_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bousergroup.component */ 6450);






let bousergroupModule = class bousergroupModule {
};
bousergroupModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _bousergroup_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bousergroup_component__WEBPACK_IMPORTED_MODULE_3__.bousergroupComponent]
    })
], bousergroupModule);



/***/ }),

/***/ 49210:
/*!****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bousergroup/bousergroup.routing.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bousergroup_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bousergroup.component */ 6450);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'bousergroups', children: [
            { path: '', component: _bousergroup_component__WEBPACK_IMPORTED_MODULE_0__.bousergroupComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _bousergroup_component__WEBPACK_IMPORTED_MODULE_0__.bousergroupComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _bousergroup_component__WEBPACK_IMPORTED_MODULE_0__.bousergroupComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _bousergroup_component__WEBPACK_IMPORTED_MODULE_0__.bousergroupComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 54989:
/*!************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bousergroup.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bousergroupService": () => (/* binding */ bousergroupService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bousergroupService = class bousergroupService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bousergroups(formData, bousergroupaccesses, Insertbousergroupaccesses) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { bousergroupaccesses: Insertbousergroupaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroup', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroup' + '/getdefaultdata').toPromise();
        }
    }
    get_bousergroups_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroup').toPromise();
        }
    }
    getListBy_usergroupid(usergroupid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroup' + '/usergroupid/' + usergroupid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroup' + '/param/' + key).toPromise();
        }
    }
    get_bousergroups_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroup' + '/e/' + id).toPromise();
        }
    }
    get_bousergroups_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroup' + '/' + id).toPromise();
        }
    }
    delete_bousergroup(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroup' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroup')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bousergroup => new bousergroup(bousergroup.usergroupid, bousergroup.groupname, bousergroup.notes, bousergroup.customfield, bousergroup.attachment, bousergroup.status, ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bousergroup => bousergroup.groupname.includes(filter.name));
            return response;
        }));
    }
};
bousergroupService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bousergroupService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bousergroupService);



/***/ }),

/***/ 17511:
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bousergroup/bousergroup.component.html ***!
  \***********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bousergroup_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'User Groups' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bousergroups()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bousergroup_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.usergroupid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.usergroupid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('groupname') == -1) && (groupnamevisible==undefined || groupnamevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"groupname\" class=\"control-label\">Group Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.groupname?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"groupname\" formControlName=\"groupname\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('notes') == -1) && (notesvisible==undefined || notesvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"notes\" class=\"control-label\">Notes</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.notes?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"notes\"\r\n                  formControlName=\"notes\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Access</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bousergroupaccesses-->\r\n            <div [ngClass]=\"Is_bousergroupaccesses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Access' | translate}}\r\n                <select class='child' id=\"bousergroupaccessesPagingdropdown\"\r\n                  (change)=\"bousergroupaccesses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbousergroupaccessesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bousergroupaccesses\r\n                (userRowSelect)=\"handle_bousergroupaccesses_GridSelected($event)\"\r\n                [settings]=\"bousergroupaccesses_settings\" (custom)=\"onCustom_bousergroupaccesses_Action($event)\"\r\n                [source]=\"tbl_bousergroupaccesses?.source?.data\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bousergroupaccesses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_bousergroup_bousergroup_module_ts.js.map