"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_lmscampaignlocation_lmscampaignlocation_c-cf7e12"],{

/***/ 20341:
/*!**********************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscampaignlocation/lmscampaignlocation.component.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscampaignlocationComponent": () => (/* binding */ lmscampaignlocationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscampaignlocation_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmscampaignlocation.component.html */ 79238);
/* harmony import */ var _service_lmscampaignlocation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmscampaignlocation.service */ 48131);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions


//Shortcuts

//translator



//primeng services



//session,application constants




//custom fields & attachments


let lmscampaignlocationComponent = class lmscampaignlocationComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmscampaignlocation_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmscampaignlocation_service = lmscampaignlocation_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_lmscampaignlocations = false;
        this.lmscampaignlocation_menuactions = [];
        this.locationid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.responsibilityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
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
        this.lmscampaignlocation_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            productid: [null],
            campaignid: [null],
            locationid: [null],
            locationiddesc: [null],
            locationname: [null],
            responsibilityid: [null],
            responsibilityiddesc: [null],
            validfrom: [null],
            validto: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmscampaignlocation_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmscampaignlocation_Form.dirty && this.lmscampaignlocation_Form.touched) {
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
            let lmscampaignlocationid = null;
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
            this.formid = lmscampaignlocationid;
            //alert(lmscampaignlocationid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.FillCustomField();
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.lmscampaignlocation_service.getDefaultData().then(res => {
                this.locationid_List = res.list_locationid.value;
                this.responsibilityid_List = res.list_responsibilityid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmscampaignlocation_service.get_lmscampaignlocations_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmscampaignlocation_Form.markAsUntouched();
            this.lmscampaignlocation_Form.markAsPristine();
        });
    }
    onSelected_locationid(locationidDetail) {
        if (locationidDetail.value && locationidDetail) {
            this.lmscampaignlocation_Form.patchValue({
                locationid: locationidDetail.value,
                locationiddesc: locationidDetail.label,
            });
        }
    }
    onSelected_responsibilityid(responsibilityidDetail) {
        if (responsibilityidDetail.value && responsibilityidDetail) {
            this.lmscampaignlocation_Form.patchValue({
                responsibilityid: responsibilityidDetail.value,
                responsibilityiddesc: responsibilityidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.lmscampaignlocation_Form != null)
            this.lmscampaignlocation_Form.reset();
        this.lmscampaignlocation_Form.patchValue({
            responsibilityid: this.sessionData.userid,
            responsibilityiddesc: this.sessionData.username,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let locationid = this.lmscampaignlocation_Form.get('locationid').value;
        if (locationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmscampaignlocation_service.delete_lmscampaignlocation(locationid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmscampaignlocation_Form.patchValue({
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
                    else if (key == "validfrom")
                        this.lmscampaignlocation_Form.patchValue({ "validfrom": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "validto")
                        this.lmscampaignlocation_Form.patchValue({ "validto": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmscampaignlocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmscampaignlocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmscampaignlocation_Form.controls[key] != undefined) {
                                this.lmscampaignlocation_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscampaignlocations", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    locationid_onChange(evt) {
        let e = evt.value;
    }
    responsibilityid_onChange(evt) {
        let e = evt.value;
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
    edit_lmscampaignlocations() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmscampaignlocation_service.get_lmscampaignlocations_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmscampaignlocation;
                let formproperty = res.lmscampaignlocation.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmscampaignlocation.pkcol;
                this.formid = res.lmscampaignlocation.locationid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmscampaignlocation;
        this.formid = res.lmscampaignlocation.locationid;
        this.pkcol = res.lmscampaignlocation.pkcol;
        this.bmyrecord = false;
        if (res.lmscampaignlocation.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmscampaignlocation_Form.patchValue({
            productid: res.lmscampaignlocation.productid,
            campaignid: res.lmscampaignlocation.campaignid,
            locationid: res.lmscampaignlocation.locationid,
            locationiddesc: res.lmscampaignlocation.locationiddesc,
            locationname: res.lmscampaignlocation.locationname,
            responsibilityid: res.lmscampaignlocation.responsibilityid,
            responsibilityiddesc: res.lmscampaignlocation.responsibilityiddesc,
            validfrom: this.ngbDateParserFormatter.parse(res.lmscampaignlocation.validfrom),
            validto: this.ngbDateParserFormatter.parse(res.lmscampaignlocation.validto),
            customfield: res.lmscampaignlocation.customfield,
            attachment: JSON.parse(res.lmscampaignlocation.attachment),
            status: res.lmscampaignlocation.status,
            statusdesc: res.lmscampaignlocation.statusdesc,
        });
        this.lmscampaignlocation_menuactions = res.lmscampaignlocation_menuactions;
        if (this.lmscampaignlocation_Form.get('customfield').value != null && this.lmscampaignlocation_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.lmscampaignlocation_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmscampaignlocation_Form.get('attachment').value != null && this.lmscampaignlocation_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.lmscampaignlocation_Form.get('attachment').value);
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmscampaignlocation_Form.controls) {
            let val = this.lmscampaignlocation_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmscampaignlocation_Form.controls[key] != null) {
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
            if (!this.lmscampaignlocation_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.lmscampaignlocation_Form.getRawValue();
            obj.validfrom = new Date(this.lmscampaignlocation_Form.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmscampaignlocation_Form.get('validfrom').value) + '  UTC' : null);
            obj.validto = new Date(this.lmscampaignlocation_Form.get('validto').value ? this.ngbDateParserFormatter.format(this.lmscampaignlocation_Form.get('validto').value) + '  UTC' : null);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.lmscampaignlocation_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmscampaignlocation_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmscampaignlocation_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmscampaignlocation_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmscampaignlocation_Form.controls[key] != null) {
                            this.formData[key] = this.lmscampaignlocation_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.validfrom = new Date(this.lmscampaignlocation_Form.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmscampaignlocation_Form.get('validfrom').value) + '  UTC' : null);
            this.formData.validto = new Date(this.lmscampaignlocation_Form.get('validto').value ? this.ngbDateParserFormatter.format(this.lmscampaignlocation_Form.get('validto').value) + '  UTC' : null);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.lmscampaignlocation_service.saveOrUpdate_lmscampaignlocations(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmscampaignlocation);
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
                        this.objvalues.push(res.lmscampaignlocation);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmscampaignlocation_Form.markAsUntouched();
                this.lmscampaignlocation_Form.markAsPristine();
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
lmscampaignlocationComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_12__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DialogService },
    { type: _service_lmscampaignlocation_service__WEBPACK_IMPORTED_MODULE_1__.lmscampaignlocationService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_18__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_8__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_20__.NgxSpinnerService }
];
lmscampaignlocationComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['customform', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['fileattachment', { static: false },] }]
};
lmscampaignlocationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-lmscampaignlocation',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscampaignlocation_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService]
    })
], lmscampaignlocationComponent);



/***/ }),

/***/ 48131:
/*!********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmscampaignlocation.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscampaignlocationService": () => (/* binding */ lmscampaignlocationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmscampaignlocationService = class lmscampaignlocationService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmscampaignlocations(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignlocation', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignlocation' + '/getdefaultdata').toPromise();
        }
    }
    get_lmscampaignlocations_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignlocation').toPromise();
        }
    }
    getListBy_locationid(locationid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignlocation' + '/locationid/' + locationid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignlocation' + '/param/' + key).toPromise();
        }
    }
    get_lmscampaignlocations_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignlocation' + '/e/' + id).toPromise();
        }
    }
    get_lmscampaignlocations_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignlocation' + '/' + id).toPromise();
        }
    }
    delete_lmscampaignlocation(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignlocation' + '/' + id).toPromise();
        }
    }
    getList_locationid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignlocation' + '/getList_locationid').toPromise();
    }
    getList_responsibilityid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignlocation' + '/getList_responsibilityid').toPromise();
    }
};
lmscampaignlocationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmscampaignlocationService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmscampaignlocationService);



/***/ }),

/***/ 79238:
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmscampaignlocation/lmscampaignlocation.component.html ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmscampaignlocation_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Campaign Locations' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmscampaignlocations()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmscampaignlocation_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.locationid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.locationid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('productid') == -1) && (productidvisible==undefined || productidvisible==true)) && maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"productid\" class=\"control-label\">Product</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.productid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"productid\" formControlName=\"productid\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('campaignid') == -1) && (campaignidvisible==undefined || campaignidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"campaignid\" class=\"control-label\">Campaign</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.campaignid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"campaignid\" formControlName=\"campaignid\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('locationname') == -1) && (locationnamevisible==undefined || locationnamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"locationname\" class=\"control-label\">Location Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.locationname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"locationname\" formControlName=\"locationname\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--responsibilityid-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('responsibilityid') == -1) && (responsibilityidvisible==undefined || responsibilityidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"responsibilityid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_responsibilityid(null)\">Responsibility</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"responsibilityid_List\"\r\n          [optionsEvent]=\"responsibilityid_optionsEvent\" [form]=\"bousermaster\"\r\n          (selectItem)=\"onSelected_responsibilityid($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n          formControlName=\"responsibilityid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.responsibilityiddesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('validfrom') == -1) && (validfromvisible==undefined || validfromvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"validfrom\" class=\"control-label\">Valid From</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.validfrom?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!showview\">\r\n          <input #validfromformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"validfromformpicker\" id=\"validfrom\"\r\n            formControlName=\"validfrom\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"validfromformpicker.toggle()\" type=\"button\"><i\r\n              class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('validto') == -1) && (validtovisible==undefined || validtovisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"validto\" class=\"control-label\">Valid To</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.validto?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!showview\">\r\n          <input #validtoformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"validtoformpicker\" id=\"validto\"\r\n            formControlName=\"validto\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"validtoformpicker.toggle()\" type=\"button\"><i\r\n              class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div class='full-width'\r\n      *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab header='CustomField' [selected]='false'>\r\n          <div class=\"sticky\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            Custom Fields</div>\r\n          <div class=\"form-group row\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n          </div>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_lmscampaignlocation_lmscampaignlocation_c-cf7e12.js.map