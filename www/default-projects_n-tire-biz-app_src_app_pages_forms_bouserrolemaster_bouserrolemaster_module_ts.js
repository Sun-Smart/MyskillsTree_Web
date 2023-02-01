"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_bouserrolemaster_bouserrolemaster_module_ts"],{

/***/ 52450:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bouserrolemasterComponent": () => (/* binding */ bouserrolemasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bouserrolemaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bouserrolemaster.component.html */ 6852);
/* harmony import */ var _service_bouserrolemaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bouserrolemaster.service */ 14454);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _bomenumaster_bomenumaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../bomenumaster/bomenumaster.component */ 66064);
/* harmony import */ var _service_bomenumaster_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../service/bomenumaster.service */ 49673);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);










//Shortcuts

//translator





//primeng services



//session,application constants




//custom fields & attachments

let bouserrolemasterComponent = class bouserrolemasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bouserrolemaster_service, bomenumaster_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bouserrolemaster_service = bouserrolemaster_service;
        this.bomenumaster_service = bomenumaster_service;
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
        this.bfilterPopulate_bouserrolemasters = false;
        this.bfilterPopulate_bousertypemenuaccesses = false;
        this.bouserrolemaster_menuactions = [];
        this.bousertypemenuaccess_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_bousertypemenuaccess_IDs = "";
        this.bousertypemenuaccesses_ID = "1";
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
        this.bouserrolemaster_Form = this.fb.group({
            pk: [null],
            userroleid: [null],
            userrole: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required])],
            additionalnotes: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bouserrolemaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bouserrolemaster_Form.dirty && this.bouserrolemaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_11__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_11__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_11__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.userroleid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.userroleid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.userroleid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
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
            let bouserrolemasterid = null;
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
            this.formid = bouserrolemasterid;
            //alert(bouserrolemasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bousertypemenuaccesses_TableConfig();
                setTimeout(() => {
                    //this.Set_bousertypemenuaccesses_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.bouserrolemaster_service.getDefaultData().then(res => {
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bouserrolemaster_service.get_bouserrolemasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bouserrolemaster_Form.markAsUntouched();
            this.bouserrolemaster_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bouserrolemaster_Form != null)
            this.bouserrolemaster_Form.reset();
        this.bouserrolemaster_Form.patchValue({});
        setTimeout(() => {
            this.Insertbousertypemenuaccesses = [];
            this.bousertypemenuaccesses_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let userroleid = this.bouserrolemaster_Form.get('userroleid').value;
        if (userroleid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bouserrolemaster_service.delete_bouserrolemaster(userroleid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bouserrolemaster_Form.patchValue({
            userroleid: null
        });
        if (this.formData.userroleid != null)
            this.formData.userroleid = null;
        for (let i = 0; i < this.tbl_bousertypemenuaccesses.source.length; i++) {
            this.tbl_bousertypemenuaccesses.source[i].rolemenuaccessid = null;
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
                        this.bouserrolemaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bouserrolemaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bouserrolemaster_Form.controls[key] != undefined) {
                                this.bouserrolemaster_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.userrole != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.userrole != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    edit_bouserrolemasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bouserrolemaster_service.get_bouserrolemasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bouserrolemaster;
                let formproperty = res.bouserrolemaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bouserrolemaster.pkcol;
                this.formid = res.bouserrolemaster.userroleid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bouserrolemaster;
        this.formid = res.bouserrolemaster.userroleid;
        this.pkcol = res.bouserrolemaster.pkcol;
        this.bmyrecord = false;
        if (res.bouserrolemaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bouserrolemaster_Form.patchValue({
            userroleid: res.bouserrolemaster.userroleid,
            userrole: res.bouserrolemaster.userrole,
            additionalnotes: res.bouserrolemaster.additionalnotes,
            status: res.bouserrolemaster.status,
            statusdesc: res.bouserrolemaster.statusdesc,
        });
        this.bouserrolemaster_menuactions = res.bouserrolemaster_menuactions;
        this.bousertypemenuaccess_menuactions = res.bousertypemenuaccess_menuactions;
        this.bousertypemenuaccesses_visiblelist = res.bousertypemenuaccesses_visiblelist;
        //Child Tables if any
        this.Set_bousertypemenuaccesses_TableConfig();
        this.bousertypemenuaccesses_LoadTable(res.bousertypemenuaccesses);
        this.Insertbousertypemenuaccesses = [];
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bouserrolemaster_Form.controls) {
            let val = this.bouserrolemaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bouserrolemaster_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.bouserrolemaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bouserrolemaster_Form.getRawValue();
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
        var _a, _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.bouserrolemaster_Form.controls).forEach(key => {
            //   const controlErrors: ValidationErrors = this.bouserrolemaster_Form.get(key).errors;
            //   if (controlErrors != null) {
            //     Object.keys(controlErrors).forEach(keyError => {
            //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //     });
            //   }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bouserrolemaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bouserrolemaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bouserrolemaster_Form.controls[key] != null) {
                            this.formData[key] = this.bouserrolemaster_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.Deleted_bousertypemenuaccess_IDs = this.Deleted_bousertypemenuaccess_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.bouserrolemaster_service.saveOrUpdate_bouserrolemasters(this.formData, (_b = (_a = this.tbl_bousertypemenuaccesses) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, this.Insertbousertypemenuaccesses).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_bousertypemenuaccesses.source) {
                    for (let i = 0; i < this.tbl_bousertypemenuaccesses.source.data.length; i++) {
                        if (this.tbl_bousertypemenuaccesses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bousertypemenuaccesses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bouserrolemaster);
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
                        this.objvalues.push(res.bouserrolemaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bouserrolemaster_Form.markAsUntouched();
                this.bouserrolemaster_Form.markAsPristine();
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
        this.tbl_bousertypemenuaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__.LocalDataSource();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bousertypemenuaccesses
    onCustom_bousertypemenuaccesses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            switch (event.action) {
                case 'viewrecord':
                    let val = event.data.pkcol;
                    this.dialog.open(_bomenumaster_bomenumaster_component__WEBPACK_IMPORTED_MODULE_3__.bomenumasterComponent, {
                        data: { showview: false, pkcol: val, ScreenType: 2 },
                    }).onClose.subscribe(res => {
                    });
                    break;
            }
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bousertypemenuaccesses");
            let formname = objbomenuaction.actionname;
        });
    }
    show_bousertypemenuaccesses_Checkbox() {
        debugger;
        if (this.tbl_bousertypemenuaccesses.source.settings['selectMode'] == 'multi')
            this.tbl_bousertypemenuaccesses.source.settings['selectMode'] = 'single';
        else
            this.tbl_bousertypemenuaccesses.source.settings['selectMode'] = 'multi';
        this.tbl_bousertypemenuaccesses.source.initGrid();
    }
    delete_bousertypemenuaccesses_All() {
        this.tbl_bousertypemenuaccesses.source.settings['selectMode'] = 'single';
    }
    show_bousertypemenuaccesses_Filter() {
        setTimeout(() => {
            //  this.Set_bousertypemenuaccesses_TableDropDownConfig();
        });
        if (this.tbl_bousertypemenuaccesses.source.settings != null)
            this.tbl_bousertypemenuaccesses.source.settings['hideSubHeader'] = !this.tbl_bousertypemenuaccesses.source.settings['hideSubHeader'];
        this.tbl_bousertypemenuaccesses.source.initGrid();
    }
    show_bousertypemenuaccesses_InActive() {
    }
    enable_bousertypemenuaccesses_InActive() {
    }
    Set_bousertypemenuaccesses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bousertypemenuaccesses) {
            }
            this.bfilterPopulate_bousertypemenuaccesses = true;
        });
    }
    bousertypemenuaccesses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bousertypemenuaccesses_TableConfig() {
        this.bousertypemenuaccesses_settings = {
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
                rolemenuaccessid: {
                    title: 'Role Menu Access',
                    type: '',
                },
                menuid: {
                    title: 'Menu',
                    type: '',
                },
                menudescription: {
                    title: 'Menudescription',
                    type: '',
                },
                menuurl: {
                    title: 'Menuurl',
                    type: '',
                },
                parentid: {
                    title: 'Parentid',
                    type: '',
                },
            },
        };
    }
    bousertypemenuaccesses_LoadTable(bousertypemenuaccesses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousertypemenuaccesses_ID) >= 0) {
            if (this.tbl_bousertypemenuaccesses != undefined)
                this.tbl_bousertypemenuaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__.LocalDataSource();
            if (this.tbl_bousertypemenuaccesses != undefined)
                this.tbl_bousertypemenuaccesses.source.load(bousertypemenuaccesses);
            setTimeout(() => {
                if (this.tbl_bousertypemenuaccesses.source != null) {
                    this.tbl_bousertypemenuaccesses.source.grid.getRows().forEach((row) => {
                        if (row.data.rolemenuaccessid != null && row.data.rolemenuaccessid != "") {
                            this.Insertbousertypemenuaccesses.push(row.data);
                            this.tbl_bousertypemenuaccesses.source.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    //external to inline
    /*
    bousertypemenuaccesses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bouserrolemaster_service.bousertypemenuaccesses.length == 0)
    {
        this.tbl_bousertypemenuaccesses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bousertypemenuaccess();
        this.bouserrolemaster_service.bousertypemenuaccesses.push(obj);
        this.tbl_bousertypemenuaccesses.source.refresh();
        if ((this.bouserrolemaster_service.bousertypemenuaccesses.length / this.tbl_bousertypemenuaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bousertypemenuaccesses.source.getPaging().page)
        {
            this.tbl_bousertypemenuaccesses.source.setPage((this.bouserrolemaster_service.bousertypemenuaccesses.length / this.tbl_bousertypemenuaccesses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bousertypemenuaccesses.source.grid.edit(this.tbl_bousertypemenuaccesses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bousertypemenuaccesses.source.data.indexOf(event.data);
    this.onDelete_bousertypemenuaccess(event,event.data.rolemenuaccessid,((this.tbl_bousertypemenuaccesses.source.getPaging().page-1) *this.tbl_bousertypemenuaccesses.source.getPaging().perPage)+index);
    this.tbl_bousertypemenuaccesses.source.refresh();
    break;
    }
    }
    
    */
    bousertypemenuaccesses_Paging(val) {
        debugger;
        this.tbl_bousertypemenuaccesses.source.setPaging(1, val, true);
    }
    handle_bousertypemenuaccesses_GridSelected(event) {
        debugger;
        if (event.isSelected) {
            if (event.data.rolemenuaccessid == null || event.data.rolemenuaccessid == "") {
                var obj = { roleid: this.formid, menuid: event.data.menuid };
                this.Insertbousertypemenuaccesses.push(obj);
            }
            else {
                var deletedids = this.Deleted_bousertypemenuaccess_IDs.split(',');
                let i = 0;
                deletedids.forEach(id => {
                    if (id == event.data.rolemenuaccessid) {
                        deletedids.splice(i, 1);
                    }
                    i++;
                });
                deletedids.join(",");
            }
        }
        else {
            if (event.data.rolemenuaccessid != null && event.data.rolemenuaccessid != "")
                this.Deleted_bousertypemenuaccess_IDs += event.data.rolemenuaccessid + ",";
        }
    }
    Is_bousertypemenuaccesses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousertypemenuaccesses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bouserrolemasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_14__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_16__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_17__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_18__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__.DialogService },
    { type: _service_bouserrolemaster_service__WEBPACK_IMPORTED_MODULE_1__.bouserrolemasterService },
    { type: _service_bomenumaster_service__WEBPACK_IMPORTED_MODULE_4__.bomenumasterService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_17__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_21__.NgxSpinnerService }
];
bouserrolemasterComponent.propDecorators = {
    tbl_bousertypemenuaccesses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['tbl_bousertypemenuaccesses', { static: false },] }]
};
bouserrolemasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-bouserrolemaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bouserrolemaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_16__.KeyboardShortcutsService]
    })
], bouserrolemasterComponent);



/***/ }),

/***/ 13007:
/*!*************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bouserrolemasterModule": () => (/* binding */ bouserrolemasterModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _bouserrolemaster_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bouserrolemaster.routing */ 32035);
/* harmony import */ var _bouserrolemaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bouserrolemaster.component */ 52450);






let bouserrolemasterModule = class bouserrolemasterModule {
};
bouserrolemasterModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _bouserrolemaster_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bouserrolemaster_component__WEBPACK_IMPORTED_MODULE_3__.bouserrolemasterComponent]
    })
], bouserrolemasterModule);



/***/ }),

/***/ 32035:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.routing.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bouserrolemaster_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bouserrolemaster.component */ 52450);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'bouserrolemasters', children: [
            { path: '', component: _bouserrolemaster_component__WEBPACK_IMPORTED_MODULE_0__.bouserrolemasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _bouserrolemaster_component__WEBPACK_IMPORTED_MODULE_0__.bouserrolemasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _bouserrolemaster_component__WEBPACK_IMPORTED_MODULE_0__.bouserrolemasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _bouserrolemaster_component__WEBPACK_IMPORTED_MODULE_0__.bouserrolemasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 6852:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.component.html ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bouserrolemaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second bgcolor\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'UserRole Masters' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bouserrolemasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bouserrolemaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.userroleid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.userroleid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('userrole') == -1) && (userrolevisible==undefined || userrolevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"userrole\" class=\"control-label required\">User Role</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.userrole?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"userrole\" required formControlName=\"userrole\" class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.userrole.errors?.required\"\r\n                  errorMsg=\"Enter {{'User Role' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='More Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('additionalnotes') == -1) && (additionalnotesvisible==undefined || additionalnotesvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"additionalnotes\" class=\"control-label\">Additional Notes</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.additionalnotes?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"additionalnotes\"\r\n                    formControlName=\"additionalnotes\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">UserType MenuAccess</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bousertypemenuaccesses-->\r\n            <div [ngClass]=\"Is_bousertypemenuaccesses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'UserType MenuAccess' | translate}}\r\n                <select class='child' id=\"bousertypemenuaccessesPagingdropdown\"\r\n                  (change)=\"bousertypemenuaccesses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbousertypemenuaccessesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bousertypemenuaccesses\r\n                (userRowSelect)=\"handle_bousertypemenuaccesses_GridSelected($event)\"\r\n                [settings]=\"bousertypemenuaccesses_settings\" (custom)=\"onCustom_bousertypemenuaccesses_Action($event)\"\r\n                [source]=\"tbl_bousertypemenuaccesses?.source?.data\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bousertypemenuaccesses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_bouserrolemaster_bouserrolemaster_module_ts.js.map