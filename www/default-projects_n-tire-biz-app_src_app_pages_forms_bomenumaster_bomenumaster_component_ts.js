"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_bomenumaster_bomenumaster_component_ts"],{

/***/ 66064:
/*!********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomenumaster/bomenumaster.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomenumasterComponent": () => (/* binding */ bomenumasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bomenumaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bomenumaster.component.html */ 7869);
/* harmony import */ var _service_bomenumaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bomenumaster.service */ 49673);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_bomenuaction_bomenuaction_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../pages/forms/bomenuaction/bomenuaction.component */ 21189);
/* harmony import */ var _service_bomenuaction_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../service/bomenuaction.service */ 46407);
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

let bomenumasterComponent = class bomenumasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bomenumaster_service, bomenuaction_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bomenumaster_service = bomenumaster_service;
        this.bomenuaction_service = bomenuaction_service;
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
        this.bfilterPopulate_bomenumasters = false;
        this.bfilterPopulate_bomenuactions = false;
        this.bomenumaster_menuactions = [];
        this.bomenuaction_menuactions = [];
        this.parentid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_bomenuaction_IDs = "";
        this.bomenuactions_ID = "1";
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
        this.bomenumaster_Form = this.fb.group({
            pk: [null],
            menuid: [null],
            menucode: [null],
            menudescription: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required])],
            menuurl: [null],
            actionkey: [null],
            iconname: [null],
            helpurl: [null],
            helptext: [null],
            parentid: [null],
            parentiddesc: [null],
            orderno: [null],
            action: [null],
            showcheckbox: [null],
            showstatus: [null],
            checkboxcolumn: [null],
            nonew: [null],
            noedit: [null],
            nodelete: [null],
            wherecondition: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bomenumaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bomenumaster_Form.dirty && this.bomenumaster_Form.touched) {
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
    menudescriptionexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.menudescription.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].menuid.toString() != this.formid.toString()) {
            if (confirm("This Menu Description value exists in the database.Do you want to display the record ? ")) {
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
        let pos = this.pkList.map(function (e) { return e.menuid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.menuid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.menuid && pkDetail) {
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
            let bomenumasterid = null;
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
            this.formid = bomenumasterid;
            //alert(bomenumasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bomenuactions_TableConfig();
                setTimeout(() => {
                    //this.Set_bomenuactions_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.bomenumaster_service.getDefaultData().then(res => {
                this.parentid_List = res.list_parentid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bomenumaster_service.get_bomenumasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bomenumaster_Form.markAsUntouched();
            this.bomenumaster_Form.markAsPristine();
        });
    }
    onSelected_parentid(parentidDetail) {
        if (parentidDetail.value && parentidDetail) {
            this.bomenumaster_Form.patchValue({
                parentid: parentidDetail.value,
                parentiddesc: parentidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.bomenumaster_Form != null)
            this.bomenumaster_Form.reset();
        this.bomenumaster_Form.patchValue({});
        setTimeout(() => {
            this.bomenuactions_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let menuid = this.bomenumaster_Form.get('menuid').value;
        if (menuid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bomenumaster_service.delete_bomenumaster(menuid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bomenumaster_Form.patchValue({
            menuid: null
        });
        if (this.formData.menuid != null)
            this.formData.menuid = null;
        for (let i = 0; i < this.tbl_bomenuactions.source.length; i++) {
            this.tbl_bomenuactions.source[i].actionid = null;
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
                        this.bomenumaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bomenumaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bomenumaster_Form.controls[key] != undefined) {
                                this.bomenumaster_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.menudescription != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.menudescription != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    parentid_onChange(evt) {
        let e = evt.value;
    }
    edit_bomenumasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bomenumaster_service.get_bomenumasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bomenumaster;
                let formproperty = res.bomenumaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bomenumaster.pkcol;
                this.formid = res.bomenumaster.menuid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bomenumaster;
        this.formid = res.bomenumaster.menuid;
        this.pkcol = res.bomenumaster.pkcol;
        this.bmyrecord = false;
        if (res.bomenumaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bomenumaster_Form.patchValue({
            menuid: res.bomenumaster.menuid,
            menucode: res.bomenumaster.menucode,
            menudescription: res.bomenumaster.menudescription,
            menuurl: res.bomenumaster.menuurl,
            actionkey: res.bomenumaster.actionkey,
            iconname: res.bomenumaster.iconname,
            helpurl: res.bomenumaster.helpurl,
            helptext: res.bomenumaster.helptext,
            parentid: res.bomenumaster.parentid,
            parentiddesc: res.bomenumaster.parentiddesc,
            orderno: res.bomenumaster.orderno,
            action: res.bomenumaster.action,
            showcheckbox: res.bomenumaster.showcheckbox,
            showstatus: res.bomenumaster.showstatus,
            checkboxcolumn: res.bomenumaster.checkboxcolumn,
            nonew: res.bomenumaster.nonew,
            noedit: res.bomenumaster.noedit,
            nodelete: res.bomenumaster.nodelete,
            wherecondition: res.bomenumaster.wherecondition,
            status: res.bomenumaster.status,
            statusdesc: res.bomenumaster.statusdesc,
        });
        this.bomenumaster_menuactions = res.bomenumaster_menuactions;
        this.bomenuaction_menuactions = res.bomenuaction_menuactions;
        this.bomenuactions_visiblelist = res.bomenuactions_visiblelist;
        //Child Tables if any
        this.Set_bomenuactions_TableConfig();
        this.bomenuactions_LoadTable(res.bomenuactions);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bomenumaster_Form.controls) {
            let val = this.bomenumaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bomenumaster_Form.controls[key] != null) {
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
            if (!this.bomenumaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bomenumaster_Form.getRawValue();
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
            // Object.keys(this.bomenumaster_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bomenumaster_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bomenumaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bomenumaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bomenumaster_Form.controls[key] != null) {
                            this.formData[key] = this.bomenumaster_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.Deleted_bomenuaction_IDs = this.Deleted_bomenuaction_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.bomenumaster_service.saveOrUpdate_bomenumasters(this.formData, (_b = (_a = this.tbl_bomenuactions) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_bomenuactions.source) {
                    for (let i = 0; i < this.tbl_bomenuactions.source.data.length; i++) {
                        if (this.tbl_bomenuactions.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bomenuactions.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bomenumaster);
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
                        this.objvalues.push(res.bomenumaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bomenumaster_Form.markAsUntouched();
                this.bomenumaster_Form.markAsPristine();
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
        this.tbl_bomenuactions.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__.LocalDataSource();
    }
    AddOrEdit_bomenuaction(event, actionid, menuid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bomenuaction_bomenuaction_component__WEBPACK_IMPORTED_MODULE_3__.bomenuactionComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, actionid, menuid, visiblelist: this.bomenuactions_visiblelist, hidelist: this.bomenuactions_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bomenuactions.source.add(res[i]);
                    }
                    this.tbl_bomenuactions.source.refresh();
                }
                else {
                    this.tbl_bomenuactions.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bomenuaction(event, childID, i) {
        if (childID != null)
            this.Deleted_bomenuaction_IDs += childID + ",";
        this.tbl_bomenuactions.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_bomenuactions_Checkbox() {
        debugger;
        if (this.tbl_bomenuactions.source.settings['selectMode'] == 'multi')
            this.tbl_bomenuactions.source.settings['selectMode'] = 'single';
        else
            this.tbl_bomenuactions.source.settings['selectMode'] = 'multi';
        this.tbl_bomenuactions.source.initGrid();
    }
    delete_bomenuactions_All() {
        this.tbl_bomenuactions.source.settings['selectMode'] = 'single';
    }
    show_bomenuactions_Filter() {
        setTimeout(() => {
            //  this.Set_bomenuactions_TableDropDownConfig();
        });
        if (this.tbl_bomenuactions.source.settings != null)
            this.tbl_bomenuactions.source.settings['hideSubHeader'] = !this.tbl_bomenuactions.source.settings['hideSubHeader'];
        this.tbl_bomenuactions.source.initGrid();
    }
    show_bomenuactions_InActive() {
    }
    enable_bomenuactions_InActive() {
    }
    Set_bomenuactions_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bomenuactions) {
                var clone = this.sharedService.clone(this.tbl_bomenuactions.source.settings);
                if (clone.columns['rowselecttype'] != undefined)
                    clone.columns['rowselecttype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomenuactions_rowselecttype.value)), }, };
                if (clone.columns['rowselecttype'] != undefined)
                    clone.columns['rowselecttype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomenuactions_rowselecttype.value)), }, };
                this.tbl_bomenuactions.source.settings = clone;
                this.tbl_bomenuactions.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bomenuactions.source.settings);
                if (clone.columns['actiontype'] != undefined)
                    clone.columns['actiontype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomenuactions_actiontype.value)), }, };
                if (clone.columns['actiontype'] != undefined)
                    clone.columns['actiontype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bomenuactions_actiontype.value)), }, };
                this.tbl_bomenuactions.source.settings = clone;
                this.tbl_bomenuactions.source.initGrid();
            }
            this.bfilterPopulate_bomenuactions = true;
        });
    }
    bomenuactions_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bomenuactions_TableConfig() {
        this.bomenuactions_settings = {
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
                custom: this.bomenuaction_menuactions
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
                description: {
                    title: 'Description',
                    type: '',
                    filter: true,
                },
                rowselecttypedesc: {
                    title: 'Row Select Type',
                    type: 'html',
                    filter: true,
                },
                actionicon: {
                    title: 'Action Icon',
                    type: '',
                    filter: true,
                },
                actiontypedesc: {
                    title: 'Action Type',
                    type: 'html',
                    filter: true,
                },
                servicename: {
                    title: 'Service Name',
                    type: '',
                    filter: true,
                },
                actionname: {
                    title: 'Action Name',
                    type: '',
                    filter: true,
                },
                actioncondition: {
                    title: 'Action Condition',
                    type: '',
                    filter: true,
                },
                actionbutton: {
                    title: 'Action Button',
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
                actionbuttonlocation: {
                    title: 'Action Button Location',
                    type: '',
                    filter: true,
                },
                actionhelp: {
                    title: 'Action Help',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                actionrequestorfield: {
                    title: 'Action Requestor Field',
                    type: '',
                    filter: true,
                },
                actionassigneduserfield: {
                    title: 'Action Assigned User Field',
                    type: '',
                    filter: true,
                },
                notificationtext: {
                    title: 'Notification Text',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                actionrequestoremailfield: {
                    title: 'Action Requestor Email Field',
                    type: '',
                    filter: true,
                },
                actionassigneduseremailfield: {
                    title: 'Action Assigned User Email Field',
                    type: '',
                    filter: true,
                },
                actionstatus: {
                    title: 'Action Status',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    bomenuactions_LoadTable(bomenuactions = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bomenuactions_ID) >= 0) {
            if (this.tbl_bomenuactions != undefined)
                this.tbl_bomenuactions.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_13__.LocalDataSource();
            if (this.tbl_bomenuactions != undefined)
                this.tbl_bomenuactions.source.load(bomenuactions);
            if (this.tbl_bomenuactions != undefined)
                this.tbl_bomenuactions.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bomenuactions_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bomenumaster_service.bomenuactions.length == 0)
    {
        this.tbl_bomenuactions.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bomenuaction();
        this.bomenumaster_service.bomenuactions.push(obj);
        this.tbl_bomenuactions.source.refresh();
        if ((this.bomenumaster_service.bomenuactions.length / this.tbl_bomenuactions.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bomenuactions.source.getPaging().page)
        {
            this.tbl_bomenuactions.source.setPage((this.bomenumaster_service.bomenuactions.length / this.tbl_bomenuactions.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bomenuactions.source.grid.edit(this.tbl_bomenuactions.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bomenuactions.source.data.indexOf(event.data);
    this.onDelete_bomenuaction(event,event.data.actionid,((this.tbl_bomenuactions.source.getPaging().page-1) *this.tbl_bomenuactions.source.getPaging().perPage)+index);
    this.tbl_bomenuactions.source.refresh();
    break;
    }
    }
    
    */
    bomenuactions_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bomenuaction(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bomenuaction(event, event.data.actionid, this.formid);
                break;
            case 'delete':
                this.onDelete_bomenuaction(event, event.data.actionid, ((this.tbl_bomenuactions.source.getPaging().page - 1) * this.tbl_bomenuactions.source.getPaging().perPage) + event.index);
                this.tbl_bomenuactions.source.refresh();
                break;
        }
    }
    bomenuactions_onDelete(obj) {
        let actionid = obj.data.actionid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bomenumaster_service.delete_bomenumaster(actionid).then(res => this.bomenuactions_LoadTable());
        }
    }
    onCustom_bomenuactions_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bomenuactions");
            let formname = objbomenuaction.actionname;
        });
    }
    bomenuactions_Paging(val) {
        debugger;
        this.tbl_bomenuactions.source.setPaging(1, val, true);
    }
    handle_bomenuactions_GridSelected(event) {
        this.bomenuactions_selectedindex = this.tbl_bomenuactions.source.findIndex(i => i.actionid === event.data.actionid);
    }
    Is_bomenuactions_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bomenuactions_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bomenumasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_14__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_16__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_17__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_18__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_19__.DialogService },
    { type: _service_bomenumaster_service__WEBPACK_IMPORTED_MODULE_1__.bomenumasterService },
    { type: _service_bomenuaction_service__WEBPACK_IMPORTED_MODULE_4__.bomenuactionService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_17__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_21__.NgxSpinnerService }
];
bomenumasterComponent.propDecorators = {
    tbl_bomenuactions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['tbl_bomenuactions', { static: false },] }]
};
bomenumasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-bomenumaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bomenumaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_16__.KeyboardShortcutsService]
    })
], bomenumasterComponent);



/***/ }),

/***/ 7869:
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bomenumaster/bomenumaster.component.html ***!
  \*************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bomenumaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Menu Masters' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bomenumasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bomenumaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.menuid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.menuid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('menucode') == -1) && (menucodevisible==undefined || menucodevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"menucode\" class=\"control-label\">Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.menucode?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"menucode\" formControlName=\"menucode\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('menudescription') == -1) && (menudescriptionvisible==undefined || menudescriptionvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"menudescription\" class=\"control-label required\">Menu Description</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.menudescription?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"menudescription\" required formControlName=\"menudescription\"\r\n                  class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.menudescription.errors?.required\"\r\n                  errorMsg=\"Enter {{'Menu Description' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('menuurl') == -1) && (menuurlvisible==undefined || menuurlvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"menuurl\" class=\"control-label\">Menu U R L</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.menuurl?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"menuurl\"\r\n                  formControlName=\"menuurl\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('actionkey') == -1) && (actionkeyvisible==undefined || actionkeyvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"actionkey\" class=\"control-label\">Action Key</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.actionkey?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"actionkey\" formControlName=\"actionkey\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('iconname') == -1) && (iconnamevisible==undefined || iconnamevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"iconname\" class=\"control-label\">Icon Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.iconname?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"iconname\" formControlName=\"iconname\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('helpurl') == -1) && (helpurlvisible==undefined || helpurlvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"helpurl\" class=\"control-label\">Help U R L</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.helpurl?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"helpurl\"\r\n                  formControlName=\"helpurl\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('helptext') == -1) && (helptextvisible==undefined || helptextvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"helptext\" class=\"control-label\">Help Text</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.helptext?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"helptext\"\r\n                  formControlName=\"helptext\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <!--parentid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('parentid') == -1) && (parentidvisible==undefined || parentidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"parentid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_parentid(null)\">Parent</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"parentid_List\" [optionsEvent]=\"parentid_optionsEvent\"\r\n                  [form]=\"bomenumaster\" (selectItem)=\"onSelected_parentid($event)\" [reportid]='opfp9' [menuid]='opfp9'\r\n                  formControlName=\"parentid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.parentiddesc?.value}}</label>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('orderno') == -1) && (ordernovisible==undefined || ordernovisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"orderno\" class=\"control-label\">Order No</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.orderno?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"orderno\" formControlName=\"orderno\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('action') == -1) && (actionvisible==undefined || actionvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"action\" class=\"control-label\">Action</label>\r\n                <!-- <label *ngIf=\"showview\" class=\"labelview\">{{f.action?.value}}</label> -->\r\n                <input *ngIf=\"!showview\" id=\"action\" formControlName=\"action\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('showcheckbox') == -1) && (showcheckboxvisible==undefined || showcheckboxvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"showcheckbox\" class=\"control-label\">Show Checkbox</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.showcheckbox?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"showcheckbox\" formControlName=\"showcheckbox\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('showstatus') == -1) && (showstatusvisible==undefined || showstatusvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"showstatus\" class=\"control-label\">Show Status</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.showstatus?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"showstatus\" formControlName=\"showstatus\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('checkboxcolumn') == -1) && (checkboxcolumnvisible==undefined || checkboxcolumnvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"checkboxcolumn\" class=\"control-label\">Checkbox Column</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.checkboxcolumn?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"checkboxcolumn\" formControlName=\"checkboxcolumn\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('nonew') == -1) && (nonewvisible==undefined || nonewvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"nonew\" class=\"control-label\">No New</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.nonew?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"nonew\" formControlName=\"nonew\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('noedit') == -1) && (noeditvisible==undefined || noeditvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"noedit\" class=\"control-label\">No Edit</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.noedit?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"noedit\" formControlName=\"noedit\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('nodelete') == -1) && (nodeletevisible==undefined || nodeletevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"nodelete\" class=\"control-label\">No Delete</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.nodelete?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"nodelete\" formControlName=\"nodelete\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('wherecondition') == -1) && (whereconditionvisible==undefined || whereconditionvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"wherecondition\" class=\"control-label\">Where Condition</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.wherecondition?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"wherecondition\" formControlName=\"wherecondition\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Menu Actions</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bomenuactions-->\r\n            <div [ngClass]=\"Is_bomenuactions_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Menu Actions' | translate}}\r\n                <select class='child' id=\"bomenuactionsPagingdropdown\"\r\n                  (change)=\"bomenuactions_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bomenuactiontoggleOption();bomenuactions_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbomenuactionsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bomenuactions_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bomenuactions (userRowSelect)=\"handle_bomenuactions_GridSelected($event)\"\r\n                [settings]=\"bomenuactions_settings\" (custom)=\"onCustom_bomenuactions_Action($event)\"\r\n                [source]=\"tbl_bomenuactions?.source?.data\" (delete)=\"bomenuactions_route($event,'delete')\"\r\n                (deleteConfirm)=\"bomenuactions_route($event,'delete')\" (create)=\"bomenuactions_route($event,'create')\"\r\n                (createConfirm)=\"bomenuactions_beforesave($event)\" (edit)=\"bomenuactions_route($event,'edit')\"\r\n                (editConfirm)=\"bomenuactions_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bomenuactions-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>\r\n");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_bomenumaster_bomenumaster_component_ts.js.map