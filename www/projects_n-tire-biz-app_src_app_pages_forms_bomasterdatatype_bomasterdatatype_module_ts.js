"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_bomasterdatatype_bomasterdatatype_module_ts"],{

/***/ 80296:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomasterdatatype/bomasterdatatype.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomasterdatatypeComponent": () => (/* binding */ bomasterdatatypeComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bomasterdatatype_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bomasterdatatype.component.html */ 97056);
/* harmony import */ var _service_bomasterdatatype_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bomasterdatatype.service */ 9802);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_bomasterdata_bomasterdata_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../pages/forms/bomasterdata/bomasterdata.component */ 46878);
/* harmony import */ var _service_bomasterdata_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../service/bomasterdata.service */ 24260);
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

let bomasterdatatypeComponent = class bomasterdatatypeComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bomasterdatatype_service, bomasterdata_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bomasterdatatype_service = bomasterdatatype_service;
        this.bomasterdata_service = bomasterdata_service;
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
        this.bfilterPopulate_bomasterdatatypes = false;
        this.bfilterPopulate_bomasterdatas = false;
        this.bomasterdatatype_menuactions = [];
        this.bomasterdata_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_bomasterdata_IDs = "";
        this.bomasterdatas_ID = "1";
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
        this.bomasterdatatype_Form = this.fb.group({
            pk: [null],
            datatypeid: [null],
            code: [null],
            codedesc: [null],
            masterdataname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required])],
            hassubcategory: [null],
            canadd: [null],
            canedit: [null],
            candelete: [null],
            erp: [null],
            cams: [null],
            crm: [null],
            procurement: [null],
            legal: [null],
            hrms: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bomasterdatatype_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bomasterdatatype_Form.dirty && this.bomasterdatatype_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.datatypeid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.datatypeid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.datatypeid && pkDetail) {
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
            let bomasterdatatypeid = null;
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
            this.formid = bomasterdatatypeid;
            //alert(bomasterdatatypeid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bomasterdatas_TableConfig();
                setTimeout(() => {
                    //this.Set_bomasterdatas_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.bomasterdatatype_service.getDefaultData().then(res => {
                this.code_List = res.list_code.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bomasterdatatype_service.get_bomasterdatatypes_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bomasterdatatype_Form.markAsUntouched();
            this.bomasterdatatype_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bomasterdatatype_Form != null)
            this.bomasterdatatype_Form.reset();
        this.bomasterdatatype_Form.patchValue({});
        setTimeout(() => {
            this.bomasterdatas_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let datatypeid = this.bomasterdatatype_Form.get('datatypeid').value;
        if (datatypeid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bomasterdatatype_service.delete_bomasterdatatype(datatypeid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bomasterdatatype_Form.patchValue({
            datatypeid: null
        });
        if (this.formData.datatypeid != null)
            this.formData.datatypeid = null;
        for (let i = 0; i < this.tbl_bomasterdatas.source.length; i++) {
            this.tbl_bomasterdatas.source[i].masterdataid = null;
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
                        this.bomasterdatatype_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bomasterdatatype_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bomasterdatatype_Form.controls[key] != undefined) {
                                this.bomasterdatatype_Form.controls[key].disable({ onlySelf: true });
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
        this.router.navigate(['/home/boreportviewer/v2mgx']);
    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.masterdataname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.masterdataname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    code_onChange(evt) {
        let e = this.f.code.value;
        this.bomasterdatatype_Form.patchValue({ codedesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_bomasterdatatypes() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bomasterdatatype_service.get_bomasterdatatypes_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bomasterdatatype;
                let formproperty = res.bomasterdatatype.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bomasterdatatype.pkcol;
                this.formid = res.bomasterdatatype.datatypeid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bomasterdatatype;
        this.formid = res.bomasterdatatype.datatypeid;
        this.pkcol = res.bomasterdatatype.pkcol;
        this.bmyrecord = false;
        if (res.bomasterdatatype.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bomasterdatatype_Form.patchValue({
            datatypeid: res.bomasterdatatype.datatypeid,
            code: res.bomasterdatatype.code,
            codedesc: res.bomasterdatatype.codedesc,
            masterdataname: res.bomasterdatatype.masterdataname,
            hassubcategory: res.bomasterdatatype.hassubcategory,
            canadd: res.bomasterdatatype.canadd,
            canedit: res.bomasterdatatype.canedit,
            candelete: res.bomasterdatatype.candelete,
            erp: res.bomasterdatatype.erp,
            cams: res.bomasterdatatype.cams,
            crm: res.bomasterdatatype.crm,
            procurement: res.bomasterdatatype.procurement,
            legal: res.bomasterdatatype.legal,
            hrms: res.bomasterdatatype.hrms,
            status: res.bomasterdatatype.status,
            statusdesc: res.bomasterdatatype.statusdesc,
        });
        this.bomasterdatatype_menuactions = res.bomasterdatatype_menuactions;
        this.bomasterdata_menuactions = res.bomasterdata_menuactions;
        this.bomasterdatas_visiblelist = res.bomasterdatas_visiblelist;
        //Child Tables if any
        this.Set_bomasterdatas_TableConfig();
        this.bomasterdatas_LoadTable(res.bomasterdatas);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bomasterdatatype_Form.controls) {
            let val = this.bomasterdatatype_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bomasterdatatype_Form.controls[key] != null) {
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
            if (!this.bomasterdatatype_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bomasterdatatype_Form.getRawValue();
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
            // Object.keys(this.bomasterdatatype_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bomasterdatatype_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bomasterdatatype_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bomasterdatatype_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bomasterdatatype_Form.controls[key] != null) {
                            this.formData[key] = this.bomasterdatatype_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.Deleted_bomasterdata_IDs = this.Deleted_bomasterdata_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.bomasterdatatype_service.saveOrUpdate_bomasterdatatypes(this.formData, (_b = (_a = this.tbl_bomasterdatas) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_bomasterdatas.source) {
                    for (let i = 0; i < this.tbl_bomasterdatas.source.data.length; i++) {
                        if (this.tbl_bomasterdatas.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bomasterdatas.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bomasterdatatype);
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
                        this.objvalues.push(res.bomasterdatatype);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bomasterdatatype_Form.markAsUntouched();
                this.bomasterdatatype_Form.markAsPristine();
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
        this.tbl_bomasterdatas.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__.LocalDataSource();
    }
    AddOrEdit_bomasterdata(event, masterdataid, datatypeid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bomasterdata_bomasterdata_component__WEBPACK_IMPORTED_MODULE_3__.bomasterdataComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, masterdataid, datatypeid, visiblelist: this.bomasterdatas_visiblelist, hidelist: this.bomasterdatas_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bomasterdatas.source.add(res[i]);
                    }
                    this.tbl_bomasterdatas.source.refresh();
                }
                else {
                    this.tbl_bomasterdatas.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bomasterdata(event, childID, i) {
        if (childID != null)
            this.Deleted_bomasterdata_IDs += childID + ",";
        this.tbl_bomasterdatas.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_bomasterdatas_Checkbox() {
        debugger;
        if (this.tbl_bomasterdatas.source.settings['selectMode'] == 'multi')
            this.tbl_bomasterdatas.source.settings['selectMode'] = 'single';
        else
            this.tbl_bomasterdatas.source.settings['selectMode'] = 'multi';
        this.tbl_bomasterdatas.source.initGrid();
    }
    delete_bomasterdatas_All() {
        this.tbl_bomasterdatas.source.settings['selectMode'] = 'single';
    }
    show_bomasterdatas_Filter() {
        setTimeout(() => {
            //  this.Set_bomasterdatas_TableDropDownConfig();
        });
        if (this.tbl_bomasterdatas.source.settings != null)
            this.tbl_bomasterdatas.source.settings['hideSubHeader'] = !this.tbl_bomasterdatas.source.settings['hideSubHeader'];
        this.tbl_bomasterdatas.source.initGrid();
    }
    show_bomasterdatas_InActive() {
    }
    enable_bomasterdatas_InActive() {
    }
    Set_bomasterdatas_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bomasterdatas) {
                var clone = this.sharedService.clone(this.tbl_bomasterdatas.source.settings);
                if (clone.columns['masterdatatypeid'] != undefined)
                    clone.columns['masterdatatypeid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomasterdatas_masterdatatypeid.value)), }, };
                if (clone.columns['masterdatatypeid'] != undefined)
                    clone.columns['masterdatatypeid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomasterdatas_masterdatatypeid.value)), }, };
                this.tbl_bomasterdatas.source.settings = clone;
                this.tbl_bomasterdatas.source.initGrid();
            }
            this.bfilterPopulate_bomasterdatas = true;
        });
    }
    bomasterdatas_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bomasterdatas_TableConfig() {
        this.bomasterdatas_settings = {
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
                custom: this.bomasterdata_menuactions
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
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                masterdatacode: {
                    title: 'Master Data Code',
                    type: '',
                    filter: true,
                },
                masterdatadescription: {
                    title: 'Master Data Description',
                    type: '',
                    filter: true,
                },
                // orderno: {
                //     title: 'Order No',
                //     type: 'number',
                //     filter: true,
                // },
                // htmlcode: {
                //     title: 'H T M L Code',
                //     type: '',
                //     filter: true,
                // },
                // param1: {
                //     title: 'Param1',
                //     type: '',
                //     filter: true,
                // },
                // param2: {
                //     title: 'Param2',
                //     type: '',
                //     filter: true,
                // },
                // helptext: {
                //     title: 'Help Text',
                //     type: 'html',
                //     filter: true,
                //     editor: {
                //         type: 'textarea',
                //     },
                // },
                // flag: {
                //     title: 'Flag',
                //     type: '',
                //     filter: true,
                // },
            },
        };
    }
    bomasterdatas_LoadTable(bomasterdatas = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bomasterdatas_ID) >= 0) {
            if (this.tbl_bomasterdatas != undefined)
                this.tbl_bomasterdatas.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__.LocalDataSource();
            if (this.tbl_bomasterdatas != undefined)
                this.tbl_bomasterdatas.source.load(bomasterdatas);
            if (this.tbl_bomasterdatas != undefined)
                this.tbl_bomasterdatas.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bomasterdatas_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bomasterdatatype_service.bomasterdatas.length == 0)
    {
        this.tbl_bomasterdatas.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bomasterdata();
        this.bomasterdatatype_service.bomasterdatas.push(obj);
        this.tbl_bomasterdatas.source.refresh();
        if ((this.bomasterdatatype_service.bomasterdatas.length / this.tbl_bomasterdatas.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bomasterdatas.source.getPaging().page)
        {
            this.tbl_bomasterdatas.source.setPage((this.bomasterdatatype_service.bomasterdatas.length / this.tbl_bomasterdatas.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bomasterdatas.source.grid.edit(this.tbl_bomasterdatas.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    if (confirm('Do you want to want to delete?')) {
    let index = this.tbl_bomasterdatas.source.data.indexOf(event.data);
    this.onDelete_bomasterdata(event,event.data.masterdataid,((this.tbl_bomasterdatas.source.getPaging().page-1) *this.tbl_bomasterdatas.source.getPaging().perPage)+index);
    this.tbl_bomasterdatas.source.refresh();
    }
    break;
    }
    }
    
    */
    bomasterdatas_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bomasterdata(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bomasterdata(event, event.data.masterdataid, this.formid);
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    this.onDelete_bomasterdata(event, event.data.masterdataid, ((this.tbl_bomasterdatas.source.getPaging().page - 1) * this.tbl_bomasterdatas.source.getPaging().perPage) + event.index);
                    this.tbl_bomasterdatas.source.refresh();
                }
                break;
        }
    }
    bomasterdatas_onDelete(obj) {
        let masterdataid = obj.data.masterdataid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bomasterdatatype_service.delete_bomasterdatatype(masterdataid).then(res => this.bomasterdatas_LoadTable());
        }
    }
    onCustom_bomasterdatas_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bomasterdatas");
            let formname = objbomenuaction.actionname;
        });
    }
    bomasterdatas_Paging(val) {
        debugger;
        this.tbl_bomasterdatas.source.setPaging(1, val, true);
    }
    handle_bomasterdatas_GridSelected(event) {
        this.bomasterdatas_selectedindex = this.tbl_bomasterdatas.source.findIndex(i => i.masterdataid === event.data.masterdataid);
    }
    Is_bomasterdatas_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bomasterdatas_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bomasterdatatypeComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_14__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_16__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_17__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_18__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__.DialogService },
    { type: _service_bomasterdatatype_service__WEBPACK_IMPORTED_MODULE_1__.bomasterdatatypeService },
    { type: _service_bomasterdata_service__WEBPACK_IMPORTED_MODULE_4__.bomasterdataService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_17__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_21__.NgxSpinnerService }
];
bomasterdatatypeComponent.propDecorators = {
    tbl_bomasterdatas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['tbl_bomasterdatas', { static: false },] }]
};
bomasterdatatypeComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-bomasterdatatype',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bomasterdatatype_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_16__.KeyboardShortcutsService]
    })
], bomasterdatatypeComponent);



/***/ }),

/***/ 72636:
/*!*************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomasterdatatype/bomasterdatatype.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomasterdatatypeModule": () => (/* binding */ bomasterdatatypeModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _bomasterdatatype_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bomasterdatatype.routing */ 4443);
/* harmony import */ var _bomasterdatatype_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bomasterdatatype.component */ 80296);
/* harmony import */ var _bomasterdata_bomasterdata_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bomasterdata/bomasterdata.module */ 80459);







let bomasterdatatypeModule = class bomasterdatatypeModule {
};
bomasterdatatypeModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _bomasterdatatype_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _bomasterdata_bomasterdata_module__WEBPACK_IMPORTED_MODULE_4__.bomasterdataModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bomasterdatatype_component__WEBPACK_IMPORTED_MODULE_3__.bomasterdatatypeComponent]
    })
], bomasterdatatypeModule);



/***/ }),

/***/ 4443:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomasterdatatype/bomasterdatatype.routing.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bomasterdatatype_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bomasterdatatype.component */ 80296);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'bomasterdatatypes', children: [
            { path: '', component: _bomasterdatatype_component__WEBPACK_IMPORTED_MODULE_0__.bomasterdatatypeComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _bomasterdatatype_component__WEBPACK_IMPORTED_MODULE_0__.bomasterdatatypeComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _bomasterdatatype_component__WEBPACK_IMPORTED_MODULE_0__.bomasterdatatypeComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _bomasterdatatype_component__WEBPACK_IMPORTED_MODULE_0__.bomasterdatatypeComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 9802:
/*!*****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bomasterdatatype.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomasterdatatypeService": () => (/* binding */ bomasterdatatypeService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bomasterdatatypeService = class bomasterdatatypeService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bomasterdatatypes(formData, bomasterdatas) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { bomasterdatas: bomasterdatas.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdatatype', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdatatype' + '/getdefaultdata').toPromise();
        }
    }
    get_bomasterdatatypes_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdatatype').toPromise();
        }
    }
    getListBy_datatypeid(datatypeid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdatatype' + '/datatypeid/' + datatypeid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdatatype' + '/param/' + key).toPromise();
        }
    }
    get_bomasterdatatypes_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdatatype' + '/e/' + id).toPromise();
        }
    }
    get_bomasterdatatypes_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdatatype' + '/' + id).toPromise();
        }
    }
    delete_bomasterdatatype(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdatatype' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdatatype')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bomasterdatatype => new bomasterdatatype(bomasterdatatype.datatypeid, bomasterdatatype.code, bomasterdatatype.codedesc, bomasterdatatype.masterdataname, bomasterdatatype.hassubcategory, bomasterdatatype.canadd, bomasterdatatype.canedit, bomasterdatatype.candelete, bomasterdatatype.erp, bomasterdatatype.cams, bomasterdatatype.crm, bomasterdatatype.procurement, bomasterdatatype.legal, bomasterdatatype.hrms, bomasterdatatype.status, ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bomasterdatatype => bomasterdatatype.masterdataname.includes(filter.name));
            return response;
        }));
    }
    getList_code() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bomasterdatatype' + '/getList_code/').toPromise();
    }
};
bomasterdatatypeService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bomasterdatatypeService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bomasterdatatypeService);



/***/ }),

/***/ 97056:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bomasterdatatype/bomasterdatatype.component.html ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bomasterdatatype_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\" style=\"background-color: #f5f3e4;\">\r\n  <div class=\"row second\">\r\n\r\n    <div class=\"col-4 columns mainheader left\">\r\n      <h1 class=\" \"><a href='#/home/{{p_currenturl}}'>{{'Master DataTypes' | translate}}</a></h1>\r\n    </div>\r\n\r\n    <div class=\"col-4 sticky1 second' role='toolbar' aria-label='Toolbar with button groups'\">\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n        <ul class='nav nav-pills  input-group '>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bomasterdatatypes()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n\r\n          <ng-container *ngFor=\"let action of bomasterdatatype_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-4 \">\r\n      <ul>\r\n        <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n\r\n          <a class=\"alert-primary popup-add-button\" [routerLink]=''(click)=\"goBack()\" ><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i>\r\n            Back</a>\r\n          <a class=\"alert-primary popup-add-button \" [routerLink]='' (click)=\"onSubmitAndWait()\"><i\r\n              class=\"fa fa-database\"></i>\r\n            Submit</a>\r\n          <a class=\"alert-primary popup-add-button \" *ngIf='data.pkcol==null || maindata.ScreenType==null'\r\n            [routerLink]='' (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n          <app-action *ngIf=\"f.datatypeid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n            [value]=\"f.datatypeid.value\" [status]=\"f.status.value\"></app-action>\r\n        </li>\r\n        <li class='nav-item actionheader'\r\n          *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n          <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n        </li>\r\n\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab class=\"myClass\">\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n\r\n\r\n            <!--code-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('code') == -1) && (codevisible==undefined || codevisible==true))\" style=''\r\n                class=\"col-3\"><label for=\"code\" class=\"control-label\">Code</label>\r\n                <input type=\"number\" id=\"code\" formControlName=\"code\" class=\"form-control\" *ngIf=\"!showview\" />\r\n                <!-- <select *ngIf=\"!showview\" id=\"code\" (change)=\"code_onChange($event.target)\" formControlName=\"code\"\r\n                  class=\"form-control\">\r\n                  <option value=\"0\">-Select-</option>\r\n                  <option *ngFor=\"let item of code_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select> -->\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.codedesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('masterdataname') == -1) && (masterdatanamevisible==undefined || masterdatanamevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"masterdataname\" class=\"control-label required\">Master Data Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.masterdataname?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"masterdataname\" required formControlName=\"masterdataname\"\r\n                  class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.masterdataname.errors?.required\"\r\n                  errorMsg=\"Enter {{'Master Dataname' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('hassubcategory') == -1) && (hassubcategoryvisible==undefined || hassubcategoryvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"hassubcategory\" class=\"control-label\">Has Subcategory</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.hassubcategory?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"hassubcategory\" formControlName=\"hassubcategory\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('canadd') == -1) && (canaddvisible==undefined || canaddvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"canadd\" class=\"control-label\">Can Add</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.canadd?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"canadd\" formControlName=\"canadd\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('canedit') == -1) && (caneditvisible==undefined || caneditvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"canedit\" class=\"control-label\">Can Edit</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.canedit?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"canedit\" formControlName=\"canedit\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('candelete') == -1) && (candeletevisible==undefined || candeletevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"candelete\" class=\"control-label\">Can Delete</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.candelete?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"candelete\" formControlName=\"candelete\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <!-- <div *ngIf=\"((hidelist.indexOf('erp') == -1) && (erpvisible==undefined || erpvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"erp\" class=\"control-label\">E R P</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.erp?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"erp\" formControlName=\"erp\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('cams') == -1) && (camsvisible==undefined || camsvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"cams\" class=\"control-label\">C A M S</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cams?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"cams\" formControlName=\"cams\" class=\"form-control\">\r\n                </div>\r\n              </div> -->\r\n            </div>\r\n            <!-- <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('crm') == -1) && (crmvisible==undefined || crmvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"crm\" class=\"control-label\">C R M</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.crm?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"crm\" formControlName=\"crm\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('procurement') == -1) && (procurementvisible==undefined || procurementvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"procurement\" class=\"control-label\">Procurement</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.procurement?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"procurement\" formControlName=\"procurement\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('legal') == -1) && (legalvisible==undefined || legalvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"legal\" class=\"control-label\">Legal</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.legal?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"legal\" formControlName=\"legal\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('hrms') == -1) && (hrmsvisible==undefined || hrmsvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"hrms\" class=\"control-label\">H R M S</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.hrms?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"hrms\" formControlName=\"hrms\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n            </div> -->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">MasterData</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bomasterdatas-->\r\n            <div [ngClass]=\"Is_bomasterdatas_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'MasterData' | translate}}\r\n                <select class='child' id=\"bomasterdatasPagingdropdown\"\r\n                  (change)=\"bomasterdatas_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bomasterdatatoggleOption();bomasterdatas_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbomasterdatasFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bomasterdatas_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bomasterdatas (userRowSelect)=\"handle_bomasterdatas_GridSelected($event)\"\r\n                [settings]=\"bomasterdatas_settings\" (custom)=\"onCustom_bomasterdatas_Action($event)\"\r\n                [source]=\"tbl_bomasterdatas?.source?.data\" (delete)=\"bomasterdatas_route($event,'delete')\"\r\n                (deleteConfirm)=\"bomasterdatas_route($event,'delete')\" (create)=\"bomasterdatas_route($event,'create')\"\r\n                (createConfirm)=\"bomasterdatas_beforesave($event)\" (edit)=\"bomasterdatas_route($event,'edit')\"\r\n                (editConfirm)=\"bomasterdatas_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bomasterdatas-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>\r\n");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_bomasterdatatype_bomasterdatatype_module_ts.js.map