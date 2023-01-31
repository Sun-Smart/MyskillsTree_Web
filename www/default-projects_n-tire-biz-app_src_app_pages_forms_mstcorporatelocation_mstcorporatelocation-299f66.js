"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_mstcorporatelocation_mstcorporatelocation-299f66"],{

/***/ 79116:
/*!************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatelocation/mstcorporatelocation.component.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstcorporatelocationComponent": () => (/* binding */ mstcorporatelocationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstcorporatelocation_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./mstcorporatelocation.component.html */ 57967);
/* harmony import */ var E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstcorporatelocation_mstcorporatelocation_component_ts_css_E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5tc3RfY29yX2J0bnsKICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHggIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3X2J0bnsKICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3c3VibWl0ewogICAgICAgICAgbWFyZ2luLXRvcDogNHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5jdXN0b21fbW9iaWxlX3ZpZXd7CiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweCAhaW1wb3J0YW50OwogICAgICAgICAgcGFkZGluZzogNHB4IDVweCAhaW1wb3J0YW50OwogICAgICAgIH0KICAgIH0KICAgIA_3D_3D_E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstcorporatelocation_mstcorporatelocation_component_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatelocation/mstcorporatelocation.component.ts.css!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5tc3RfY29yX2J0bnsKICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHggIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3X2J0bnsKICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3c3VibWl0ewogICAgICAgICAgbWFyZ2luLXRvcDogNHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5jdXN0b21fbW9iaWxlX3ZpZXd7CiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweCAhaW1wb3J0YW50OwogICAgICAgICAgcGFkZGluZzogNHB4IDVweCAhaW1wb3J0YW50OwogICAgICAgIH0KICAgIH0KICAgIA%3D%3D!./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatelocation/mstcorporatelocation.component.ts */ 80990);
/* harmony import */ var _service_mstcorporatelocation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../service/mstcorporatelocation.service */ 63723);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);










//Shortcuts

//translator



//primeng services



//session,application constants




//custom fields & attachments

let mstcorporatelocationComponent = class mstcorporatelocationComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, mstcorporatelocation_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.mstcorporatelocation_service = mstcorporatelocation_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_mstcorporatelocations = false;
        this.mstcorporatelocation_menuactions = [];
        this.countryid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter(); //autocomplete
        this.stateid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter(); //autocomplete
        this.cityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter(); //autocomplete
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
        this.mstcorporatelocation_Form = this.fb.group({
            pk: [null],
            locationid: [null],
            corporateid: [null],
            branchid: [null],
            branchdesc: [null],
            countryid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required])],
            countryiddesc: [null],
            stateid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required])],
            stateiddesc: [null],
            cityid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required])],
            cityiddesc: [null],
            address1: [null],
            address2: [null],
            pincode: [null],
            contactperson: [null],
            designation: [null],
            emailid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required])],
            mobile: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required])],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.mstcorporatelocation_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.mstcorporatelocation_Form.dirty && this.mstcorporatelocation_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.locationid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.locationid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.locationid && pkDetail) {
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
            let mstcorporatelocationid = null;
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
            this.formid = mstcorporatelocationid;
            //alert(mstcorporatelocationid);
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
            this.mstcorporatelocation_service.getDefaultData().then(res => {
                this.countryid_List = res.list_countryid.value;
                this.stateid_List = res.list_stateid.value;
                this.cityid_List = res.list_cityid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.mstcorporatelocation_service.get_mstcorporatelocations_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched
            this.mstcorporatelocation_Form.markAsUntouched();
            this.mstcorporatelocation_Form.markAsPristine();
        });
    }
    onSelected_countryid(countryidDetail) {
        if (countryidDetail.value && countryidDetail) {
            this.mstcorporatelocation_Form.patchValue({
                country: countryidDetail.value,
                countrydesc: countryidDetail.label,
            });
            this.mstcorporatelocation_service.getList_stateid(countryidDetail.value).then(res => {
                this.stateid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
        // if (countryidDetail.value && countryidDetail) {
        //     this.mstcorporatelocation_Form.patchValue({
        //         countryid: countryidDetail.value,
        //         countryiddesc: countryidDetail.label,
        //     });
        // }
    }
    onSelected_stateid(stateidDetail) {
        if (stateidDetail.value && stateidDetail) {
            this.mstcorporatelocation_Form.patchValue({
                state: stateidDetail.value,
                statedesc: stateidDetail.label,
            });
            this.mstcorporatelocation_service.getList_cityid(stateidDetail.value).then(res => {
                this.cityid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
        // if (stateidDetail.value && stateidDetail) {
        //     this.mstcorporatelocation_Form.patchValue({
        //         stateid: stateidDetail.value,
        //         stateiddesc: stateidDetail.label,
        //     });
        // }
    }
    onSelected_cityid(cityidDetail) {
        if (cityidDetail.value && cityidDetail) {
            this.mstcorporatelocation_Form.patchValue({
                cityid: cityidDetail.value,
                cityiddesc: cityidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.mstcorporatelocation_Form != null)
            this.mstcorporatelocation_Form.reset();
        this.mstcorporatelocation_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let locationid = this.mstcorporatelocation_Form.get('locationid').value;
        if (locationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstcorporatelocation_service.delete_mstcorporatelocation(locationid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.mstcorporatelocation_Form.patchValue({
            locationid: null
        });
        if (this.formData.locationid != null)
            this.formData.locationid = null;
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
                        this.mstcorporatelocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstcorporatelocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstcorporatelocation_Form.controls[key] != undefined) {
                                this.mstcorporatelocation_Form.controls[key].disable({ onlySelf: true });
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
    countryid_onChange(evt) {
        let e = evt.value;
    }
    stateid_onChange(evt) {
        let e = evt.value;
    }
    cityid_onChange(evt) {
        let e = evt.value;
    }
    edit_mstcorporatelocations() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.mstcorporatelocation_service.get_mstcorporatelocations_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.mstcorporatelocation;
                let formproperty = res.mstcorporatelocation.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.mstcorporatelocation.pkcol;
                this.formid = res.mstcorporatelocation.locationid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.mstcorporatelocation;
        this.formid = res.mstcorporatelocation.locationid;
        this.pkcol = res.mstcorporatelocation.pkcol;
        this.bmyrecord = false;
        if (res.mstcorporatelocation.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.mstcorporatelocation_Form.patchValue({
            locationid: res.mstcorporatelocation.locationid,
            corporateid: res.mstcorporatelocation.corporateid,
            branchid: res.mstcorporatelocation.branchid,
            branchdesc: res.mstcorporatelocation.branchdesc,
            countryid: res.mstcorporatelocation.countryid,
            countryiddesc: res.mstcorporatelocation.countryiddesc,
            stateid: res.mstcorporatelocation.stateid,
            stateiddesc: res.mstcorporatelocation.stateiddesc,
            cityid: res.mstcorporatelocation.cityid,
            cityiddesc: res.mstcorporatelocation.cityiddesc,
            address1: res.mstcorporatelocation.address1,
            address2: res.mstcorporatelocation.address2,
            pincode: res.mstcorporatelocation.pincode,
            contactperson: res.mstcorporatelocation.contactperson,
            designation: res.mstcorporatelocation.designation,
            emailid: res.mstcorporatelocation.emailid,
            mobile: res.mstcorporatelocation.mobile,
            status: res.mstcorporatelocation.status,
            statusdesc: res.mstcorporatelocation.statusdesc,
        });
        this.mstcorporatelocation_menuactions = res.mstcorporatelocation_menuactions;
        //Child Tables if any
        setTimeout(() => {
            if (this.f.countryid.value && this.f.countryid.value != "" && this.f.countryid.value != null)
                this.mstcorporatelocation_service.getList_stateid(this.f.countryid.value).then(res => {
                    this.stateid_List = res;
                    this.mstcorporatelocation_Form.patchValue({
                        stateid: this.formData.stateid,
                        stateiddesc: this.formData.stateiddesc,
                    });
                }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.stateid.value && this.f.stateid.value != "" && this.f.stateid.value != null)
                this.mstcorporatelocation_service.getList_cityid(this.f.stateid.value).then(res => {
                    this.cityid_List = res;
                    this.mstcorporatelocation_Form.patchValue({
                        cityid: this.formData.cityid,
                        cityiddesc: this.formData.cityiddesc,
                    });
                }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        setTimeout(() => {
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.mstcorporatelocation_Form.controls) {
            let val = this.mstcorporatelocation_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.mstcorporatelocation_Form.controls[key] != null) {
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
            if (!this.mstcorporatelocation_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.mstcorporatelocation_Form.getRawValue();
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.mstcorporatelocation_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.mstcorporatelocation_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.mstcorporatelocation_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.mstcorporatelocation_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.mstcorporatelocation_Form.controls[key] != null) {
                            this.formData[key] = this.mstcorporatelocation_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.mstcorporatelocation_service.saveOrUpdate_mstcorporatelocations(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.mstcorporatelocation);
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
                        this.objvalues.push(res.mstcorporatelocation);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstcorporatelocation_Form.markAsUntouched();
                this.mstcorporatelocation_Form.markAsPristine();
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
mstcorporatelocationComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_12__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DialogService },
    { type: _service_mstcorporatelocation_service__WEBPACK_IMPORTED_MODULE_2__.mstcorporatelocationService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_19__.NgxSpinnerService }
];
mstcorporatelocationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-mstcorporatelocation',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstcorporatelocation_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService],
        styles: [E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstcorporatelocation_mstcorporatelocation_component_ts_css_E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5tc3RfY29yX2J0bnsKICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHggIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3X2J0bnsKICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3c3VibWl0ewogICAgICAgICAgbWFyZ2luLXRvcDogNHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5jdXN0b21fbW9iaWxlX3ZpZXd7CiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweCAhaW1wb3J0YW50OwogICAgICAgICAgcGFkZGluZzogNHB4IDVweCAhaW1wb3J0YW50OwogICAgICAgIH0KICAgIH0KICAgIA_3D_3D_E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstcorporatelocation_mstcorporatelocation_component_ts__WEBPACK_IMPORTED_MODULE_1__]
    })
], mstcorporatelocationComponent);



/***/ }),

/***/ 63723:
/*!*********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/mstcorporatelocation.service.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstcorporatelocationService": () => (/* binding */ mstcorporatelocationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let mstcorporatelocationService = class mstcorporatelocationService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_mstcorporatelocations(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstcorporatelocation', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstcorporatelocation' + '/getdefaultdata').toPromise();
        }
    }
    get_mstcorporatelocations_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstcorporatelocation').toPromise();
        }
    }
    getListBy_locationid(locationid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstcorporatelocation' + '/locationid/' + locationid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstcorporatelocation' + '/param/' + key).toPromise();
        }
    }
    get_mstcorporatelocations_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstcorporatelocation' + '/e/' + id).toPromise();
        }
    }
    get_mstcorporatelocations_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstcorporatelocation' + '/' + id).toPromise();
        }
    }
    delete_mstcorporatelocation(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstcorporatelocation' + '/' + id).toPromise();
        }
    }
    getList_countryid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstcorporatelocation' + '/getList_countryid').toPromise();
    }
    getList_stateid(stateid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstcorporatelocation' + '/getList_stateid/' + stateid).toPromise();
    }
    getList_cityid(cityid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstcorporatelocation' + '/getList_cityid/' + cityid).toPromise();
    }
};
mstcorporatelocationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
mstcorporatelocationService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], mstcorporatelocationService);



/***/ }),

/***/ 57967:
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatelocation/mstcorporatelocation.component.html ***!
  \*****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"mstcorporatelocation_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\" style=\"background-color: #f5f3e4;\" ><a href='#/home/{{p_currenturl}}' style=\"margin: auto;\">{{'Corporate Locations' |\r\n        translate}}</a> </h1>\r\n    <div class='col  sticky1 second common_header_clr' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_mstcorporatelocations()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of mstcorporatelocation_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success custom_mobile_view\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary mobile_view_btn\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.locationid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.locationid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger custom_mobile_view\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('corporateid') == -1) && (corporateidvisible==undefined || corporateidvisible==true))\"\r\n        style='' class=\"col-3 education_view_mobile\">\r\n        <label for=\"corporateid\" class=\"control-label\">Corporate</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.corporateid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"corporateid\" [(ngModel)]=\"corporateid\" class=\"form-control\">\r\n      </div>\r\n      <!-- <div *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"branchid\" class=\"control-label\">Branch</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.branchdesc?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"branchdesc\" [(ngModel)]=\"branchdesc\" type=\"text\" class=\"form-control\">\r\n      </div> -->\r\n\r\n\r\n      <!--countryid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('countryid') == -1) && (countryidvisible==undefined || countryidvisible==true))\"\r\n        style='' class=\"col-3 education_view_mobile\"><label for=\"countryid\" class=\"control-label required\"\r\n          (click)=\"AddOrEdit_countryid(null)\">Country</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"countryid_List\" [optionsEvent]=\"countryid_optionsEvent\"\r\n          [form]=\"bocountry\" (selectItem)=\"onSelected_countryid($event)\" [reportid]='wc9rn' [menuid]='wc9rn'\r\n          formControlName=\"countryid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.countryiddesc?.value}}</label>\r\n        <app-field-error-display [displayError]=\"f.countryid.errors?.required\"\r\n          errorMsg=\"Enter {{'Country' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n\r\n\r\n      <!--stateid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('stateid') == -1) && (stateidvisible==undefined || stateidvisible==true))\" style=''\r\n        class=\"col-3 education_view_mobile\"><label for=\"stateid\" class=\"control-label required\"\r\n          (click)=\"AddOrEdit_stateid(null)\">State</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"stateid_List\" [optionsEvent]=\"stateid_optionsEvent\"\r\n          [form]=\"bostate\" (selectItem)=\"onSelected_stateid($event)\" [reportid]='tyo5r' [menuid]='tyo5r'\r\n          formControlName=\"stateid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.stateiddesc?.value}}</label>\r\n        <app-field-error-display [displayError]=\"f.stateid.errors?.required\" errorMsg=\"Enter {{'State' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('cityid') == -1) && (cityidvisible==undefined || cityidvisible==true))\" style=''\r\n      class=\"col-3 education_view_mobile\"><label for=\"cityid\" class=\"control-label required\" (click)=\"AddOrEdit_cityid(null)\">City</label>\r\n      <app-popupselect *ngIf=\"!showview\" [options]=\"cityid_List\" [optionsEvent]=\"cityid_optionsEvent\" [form]=\"bocity\"\r\n        (selectItem)=\"onSelected_cityid($event)\" [reportid]='kbg3n' [menuid]='kbg3n' formControlName=\"cityid\"\r\n        id=\"value\" desc=\"label\"></app-popupselect>\r\n      <div class=\"input-group\">\r\n      </div>\r\n      <label *ngIf=\"showview\" class=\"labelview\">{{f.cityiddesc?.value}}</label>\r\n      <app-field-error-display [displayError]=\"f.cityid.errors?.required\" errorMsg=\"Enter {{'City' | translate}}\">\r\n      </app-field-error-display>\r\n    </div>\r\n    <div *ngIf=\"((hidelist.indexOf('address1') == -1) && (address1visible==undefined || address1visible==true))\"\r\n        style='' class=\"col-3 education_view_mobile\">\r\n        <label for=\"address1\" class=\"control-label\">Address1</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.address1?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"address1\" formControlName=\"address1\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--cityid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('address2') == -1) && (address2visible==undefined || address2visible==true))\"\r\n        style='' class=\"col-3 education_view_mobile\">\r\n        <label for=\"address2\" class=\"control-label\">Address2</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.address2?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"address2\" formControlName=\"address2\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('pincode') == -1) && (pincodevisible==undefined || pincodevisible==true))\" style=''\r\n        class=\"col-3 education_view_mobile\">\r\n        <label for=\"pincode\" class=\"control-label\">Pin Code</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.pincode?.value}}</label>\r\n        <input type=\"number\"  required pattern=\"^[0-9]{6}$\" maxlength=\"6\" *ngIf=\"!showview\" id=\"pincode\"  formControlName=\"pincode\" class=\"form-control\">\r\n\r\n        <!-- \"Enter Pincode\" required pattern=\"^[0-9]{6}$\" title=\"Enter Valid Pin Code\" -->\r\n\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('contactperson') == -1) && (contactpersonvisible==undefined || contactpersonvisible==true))\"\r\n        style='' class=\"col-3 education_view_mobile\">\r\n        <label for=\"contactperson\" class=\"control-label\">Contact Person</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.contactperson?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"contactperson\" formControlName=\"contactperson\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n      *ngIf=\"((hidelist.indexOf('designation') == -1) && (designationvisible==undefined || designationvisible==true))\"\r\n      style='' class=\"col-3 education_view_mobile\">\r\n      <label for=\"designation\" class=\"control-label\">Designation</label>\r\n      <label *ngIf=\"showview\" class=\"labelview\">{{f.designation?.value}}</label>\r\n      <input *ngIf=\"!showview\" id=\"designation\" formControlName=\"designation\" class=\"form-control\">\r\n    </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('emailid') == -1) && (emailidvisible==undefined || emailidvisible==true))\" style=''\r\n        class=\"col-3 education_view_mobile\">\r\n        <label for=\"emailid\" class=\"control-label required\">Email</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.emailid?.value}}</label>\r\n        <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"emailid\" required formControlName=\"emailid\"\r\n          class=\"form-control\">\r\n        <app-field-error-display [displayError]=\"f.emailid.errors!=null && f.emailid.errors?.email\"\r\n          errorMsg=\"Enter valid email\">\r\n        </app-field-error-display>\r\n        <app-field-error-display [displayError]=\"f.emailid.errors?.required\" errorMsg=\"Enter {{'Email' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('mobile') == -1) && (mobilevisible==undefined || mobilevisible==true))\" style=''\r\n        class=\"col-3 education_view_mobile\">\r\n        <label for=\"mobile\" class=\"control-label required\">Mobile</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.mobile?.value}}</label>\r\n        <int-phone-prefix *ngIf=\"!showview\" id=\"mobile\" required formControlName=\"mobile\" [locale]=\"'en'\"\r\n           class=\"form-control telephone\">\r\n        </int-phone-prefix>\r\n        <app-field-error-display [displayError]=\"f.mobile.errors?.required\" errorMsg=\"Enter {{'Mobile' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ 80990:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatelocation/mstcorporatelocation.component.ts.css!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5tc3RfY29yX2J0bnsKICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHggIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3X2J0bnsKICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3c3VibWl0ewogICAgICAgICAgbWFyZ2luLXRvcDogNHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5jdXN0b21fbW9iaWxlX3ZpZXd7CiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweCAhaW1wb3J0YW50OwogICAgICAgICAgcGFkZGluZzogNHB4IDVweCAhaW1wb3J0YW50OwogICAgICAgIH0KICAgIH0KICAgIA%3D%3D!./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatelocation/mstcorporatelocation.component.ts ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n    @media only screen and (max-width: 600px) {\n      .education_view_mobile{\n          min-width: 100% !important;\n          margin: 0px !important;\n        }\n        .mst_cor_btn{\n          padding: 4px 6px !important;\n        }\n        .mobile_view_btn{\n          display: none !important;\n        }\n        .mobile_viewsubmit{\n          margin-top: 4px !important;\n        }\n        .custom_mobile_view{\n          margin-right: 0px !important;\n          padding: 4px 5px !important;\n        }\n    }\n    \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1zdGNvcnBvcmF0ZWxvY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRTtVQUNJLDBCQUEwQjtVQUMxQixzQkFBc0I7UUFDeEI7UUFDQTtVQUNFLDJCQUEyQjtRQUM3QjtRQUNBO1VBQ0Usd0JBQXdCO1FBQzFCO1FBQ0E7VUFDRSwwQkFBMEI7UUFDNUI7UUFDQTtVQUNFLDRCQUE0QjtVQUM1QiwyQkFBMkI7UUFDN0I7SUFDSiIsImZpbGUiOiJtc3Rjb3Jwb3JhdGVsb2NhdGlvbi5jb21wb25lbnQudHMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAuZWR1Y2F0aW9uX3ZpZXdfbW9iaWxle1xuICAgICAgICAgIG1pbi13aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLm1zdF9jb3JfYnRue1xuICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHggIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAubW9iaWxlX3ZpZXdfYnRue1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAubW9iaWxlX3ZpZXdzdWJtaXR7XG4gICAgICAgICAgbWFyZ2luLXRvcDogNHB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLmN1c3RvbV9tb2JpbGVfdmlld3tcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweCAhaW1wb3J0YW50O1xuICAgICAgICAgIHBhZGRpbmc6IDRweCA1cHggIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAiXX0= */";

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_mstcorporatelocation_mstcorporatelocation-299f66.js.map