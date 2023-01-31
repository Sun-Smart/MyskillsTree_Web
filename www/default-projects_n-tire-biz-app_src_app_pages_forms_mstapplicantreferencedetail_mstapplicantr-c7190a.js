"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_mstapplicantreferencedetail_mstapplicantr-c7190a"],{

/***/ 17130:
/*!**************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.component.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantreferencedetailComponent": () => (/* binding */ mstapplicantreferencedetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantreferencedetail_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./mstapplicantreferencedetail.component.html */ 54489);
/* harmony import */ var _service_mstapplicantreferencedetail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/mstapplicantreferencedetail.service */ 43162);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component */ 49342);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions



//Shortcuts

//translator



//primeng services



//session,application constants




//custom fields & attachments

let mstapplicantreferencedetailComponent = class mstapplicantreferencedetailComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, mstapplicantreferencedetail_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.mstapplicantreferencedetail_service = mstapplicantreferencedetail_service;
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
        this.bfilterPopulate_mstapplicantreferencedetails = false;
        this.mstapplicantreferencedetail_menuactions = [];
        this.applicantid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__.AppConstants.UploadURL;
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
        this.mstapplicantreferencedetail_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            applicantid: [null],
            applicantiddesc: [null],
            referenceid: [null],
            referencetype: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required])],
            referencetypedesc: [null],
            referencename: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required])],
            companyname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required])],
            designation: [null],
            mobilenumber: [null],
            email: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required])],
            knownduration: [null],
            isrelative: [null],
            remarks: [null],
            requestid: [null],
            referenceacceptance: [null],
            referenceacceptancedesc: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.mstapplicantreferencedetail_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.mstapplicantreferencedetail_Form.dirty && this.mstapplicantreferencedetail_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.referenceid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.referenceid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.referenceid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            let checkuser = localStorage.getItem('role');
            if (checkuser == '3') {
                this.showRefAcept = true;
            }
            console.log('checkuser ', checkuser);
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
            let mstapplicantreferencedetailid = null;
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
            this.formid = mstapplicantreferencedetailid;
            //alert(mstapplicantreferencedetailid);
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
            this.mstapplicantreferencedetail_service.getDefaultData().then(res => {
                this.applicantid_List = res.list_applicantid.value;
                this.referencetype_List = res.list_referencetype.value;
                this.referenceacceptance_List = res.list_referenceacceptance.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.mstapplicantreferencedetail_service.get_mstapplicantreferencedetails_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched
            this.mstapplicantreferencedetail_Form.markAsUntouched();
            this.mstapplicantreferencedetail_Form.markAsPristine();
        });
    }
    onSelected_applicantid(applicantidDetail) {
        if (applicantidDetail.value && applicantidDetail) {
            this.mstapplicantreferencedetail_Form.patchValue({
                applicantid: applicantidDetail.value,
                applicantiddesc: applicantidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.mstapplicantreferencedetail_Form != null)
            this.mstapplicantreferencedetail_Form.reset();
        this.mstapplicantreferencedetail_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let referenceid = this.mstapplicantreferencedetail_Form.get('referenceid').value;
        if (referenceid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstapplicantreferencedetail_service.delete_mstapplicantreferencedetail(referenceid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.mstapplicantreferencedetail_Form.patchValue({
            referenceid: null
        });
        if (this.formData.referenceid != null)
            this.formData.referenceid = null;
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
                        this.mstapplicantreferencedetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstapplicantreferencedetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstapplicantreferencedetail_Form.controls[key] != undefined) {
                                this.mstapplicantreferencedetail_Form.controls[key].disable({ onlySelf: true });
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
            // this.onSubmitDataDlg(false);
            this.onSubmitData(false);
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
    applicantid_onChange(evt) {
        let e = evt.value;
    }
    referencetype_onChange(evt) {
        let e = this.f.referencetype.value;
        this.mstapplicantreferencedetail_Form.patchValue({ referencetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    referenceacceptance_onChange(evt) {
        let e = this.f.referenceacceptance.value;
        this.mstapplicantreferencedetail_Form.patchValue({ referenceacceptancedesc: evt.options[evt.options.selectedIndex].text });
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
    edit_mstapplicantreferencedetails() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.mstapplicantreferencedetail_service.get_mstapplicantreferencedetails_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.mstapplicantreferencedetail;
                let formproperty = res.mstapplicantreferencedetail.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.mstapplicantreferencedetail.pkcol;
                this.formid = res.mstapplicantreferencedetail.referenceid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.mstapplicantreferencedetail;
        this.formid = res.mstapplicantreferencedetail.referenceid;
        this.pkcol = res.mstapplicantreferencedetail.pkcol;
        this.bmyrecord = false;
        if (res.mstapplicantreferencedetail.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.mstapplicantreferencedetail_Form.patchValue({
            applicantid: res.mstapplicantreferencedetail.applicantid,
            applicantiddesc: res.mstapplicantreferencedetail.applicantiddesc,
            referenceid: res.mstapplicantreferencedetail.referenceid,
            referencetype: res.mstapplicantreferencedetail.referencetype,
            referencetypedesc: res.mstapplicantreferencedetail.referencetypedesc,
            referencename: res.mstapplicantreferencedetail.referencename,
            companyname: res.mstapplicantreferencedetail.companyname,
            designation: res.mstapplicantreferencedetail.designation,
            mobilenumber: res.mstapplicantreferencedetail.mobilenumber,
            email: res.mstapplicantreferencedetail.email,
            knownduration: res.mstapplicantreferencedetail.knownduration,
            isrelative: res.mstapplicantreferencedetail.isrelative,
            remarks: res.mstapplicantreferencedetail.remarks,
            requestid: res.mstapplicantreferencedetail.requestid,
            referenceacceptance: res.mstapplicantreferencedetail.referenceacceptance,
            referenceacceptancedesc: res.mstapplicantreferencedetail.referenceacceptancedesc,
            attachment: JSON.parse(res.mstapplicantreferencedetail.attachment),
            status: res.mstapplicantreferencedetail.status,
            statusdesc: res.mstapplicantreferencedetail.statusdesc,
        });
        this.mstapplicantreferencedetail_menuactions = res.mstapplicantreferencedetail_menuactions;
        if (this.mstapplicantreferencedetail_Form.get('attachment').value != null && this.mstapplicantreferencedetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.mstapplicantreferencedetail_Form.get('attachment').value);
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.mstapplicantreferencedetail_Form.controls) {
            let val = this.mstapplicantreferencedetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.mstapplicantreferencedetail_Form.controls[key] != null) {
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
            if (!this.mstapplicantreferencedetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.mstapplicantreferencedetail_Form.getRawValue();
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
    viewrequestid() {
        this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantreferencerequestComponent, {
            data: { showview: true, save: true, pkcol: this.sharedService.pk_encode(this.mstapplicantreferencedetail_Form.get('requestid').value), ScreenType: 2 },
        }).onClose.subscribe(res => {
        });
    }
    onSubmitData(bclear) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            if (!this.mstapplicantreferencedetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            // Object.keys(this.mstapplicantreferencedetail_Form.controls).forEach(key => {
            //   const controlErrors: ValidationErrors = this.mstapplicantreferencedetail_Form.get(key).errors;
            //   if (controlErrors != null) {
            //     Object.keys(controlErrors).forEach(keyError => {
            //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //     });
            //   }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.validate()) {
                return;
            }
            this.formData = this.mstapplicantreferencedetail_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.mstapplicantreferencedetail_Form.controls[key] != null) {
                            this.formData[key] = this.mstapplicantreferencedetail_Form.controls[key].value;
                        }
                    }
                }
            }
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.mstapplicantreferencedetail_service.saveOrUpdate_mstapplicantreferencedetails(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.mstapplicantreferencedetail);
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
                        this.objvalues.push(res.mstapplicantreferencedetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstapplicantreferencedetail_Form.markAsUntouched();
                this.mstapplicantreferencedetail_Form.markAsPristine();
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
mstapplicantreferencedetailComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DialogService },
    { type: _service_mstapplicantreferencedetail_service__WEBPACK_IMPORTED_MODULE_1__.mstapplicantreferencedetailService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_20__.NgxSpinnerService }
];
mstapplicantreferencedetailComponent.propDecorators = {
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['fileattachment', { static: false },] }]
};
mstapplicantreferencedetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-mstapplicantreferencedetail',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantreferencedetail_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService]
    })
], mstapplicantreferencedetailComponent);



/***/ }),

/***/ 56643:
/*!***********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.module.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantreferencedetailModule": () => (/* binding */ mstapplicantreferencedetailModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantreferencedetail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantreferencedetail.routing */ 50688);
/* harmony import */ var _mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantreferencedetail.component */ 17130);






let mstapplicantreferencedetailModule = class mstapplicantreferencedetailModule {
};
mstapplicantreferencedetailModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantreferencedetail_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantreferencedetailComponent]
    })
], mstapplicantreferencedetailModule);



/***/ }),

/***/ 50688:
/*!************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.routing.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantreferencedetail.component */ 17130);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicantreferencedetails', children: [
            { path: '', component: _mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 43162:
/*!****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/mstapplicantreferencedetail.service.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantreferencedetailService": () => (/* binding */ mstapplicantreferencedetailService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let mstapplicantreferencedetailService = class mstapplicantreferencedetailService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_mstapplicantreferencedetails(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstapplicantreferencedetail', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/getdefaultdata').toPromise();
        }
    }
    get_mstapplicantreferencedetails_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstapplicantreferencedetail').toPromise();
        }
    }
    getListBy_referenceid(referenceid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/referenceid/' + referenceid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/param/' + key).toPromise();
        }
    }
    get_mstapplicantreferencedetails_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/e/' + id).toPromise();
        }
    }
    get_mstapplicantreferencedetails_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/' + id).toPromise();
        }
    }
    delete_mstapplicantreferencedetail(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/' + id).toPromise();
        }
    }
    getList_applicantid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstapplicantreferencedetail' + '/getList_applicantid').toPromise();
    }
    getList_referencetype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstapplicantreferencedetail' + '/getList_referencetype/').toPromise();
    }
    getList_referenceacceptance() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstapplicantreferencedetail' + '/getList_referenceacceptance/').toPromise();
    }
};
mstapplicantreferencedetailService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
mstapplicantreferencedetailService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], mstapplicantreferencedetailService);



/***/ }),

/***/ 54489:
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.component.html ***!
  \*******************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"mstapplicantreferencedetail_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second common_title_style\">\r\n    <h1 class=\"col-4 columns mainheader left\">{{'Reference Details' | translate}}\r\n    </h1>\r\n    <div class='col  sticky1 second common_header_clr' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_mstapplicantreferencedetails()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <!-- <ng-container *ngFor=\"let action of mstapplicantreferencedetail_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>-->\r\n          <!-- <li class='nav-item actionheader' *ngIf=\"!showview\"  style=\"padding: 1px 0px 8px 0px;\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.referenceid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.referenceid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li> -->\r\n          <li class='nav-item actionheader common_title_style' *ngIf=\"!showview\">\r\n            <!-- <a class=\"alert-success\" [routerLink]=''>  -->\r\n            <button type=\"button\" class=\"btn btn-outline-primary  popup-add-button\" (click)=\"onSubmitAndWait()\">Submit</button>&nbsp;\r\n            <!-- <a class=\"alert-primary common_title_style\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a> -->\r\n            <button type=\"button\" class=\"btn btn-outline-primary  popup-add-button\" *ngIf='data.pkcol==null || maindata.ScreenType==null'\r\n              (click)=\"onSubmit()\">Submit & Clear</button>&nbsp;\r\n            <app-action *ngIf=\"f.referenceid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.referenceid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <i class='nav-item actionheader common_title_style'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\"\r\n            class=\"fa fa-times-circle close_common_icon2\" (click)=\"onClose()\"></i>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n\r\n\r\n    <!--applicantid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('applicantid') == -1) && (applicantidvisible==undefined || applicantidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"applicantid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_applicantid(null)\">Applicant</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"applicantid_List\" [optionsEvent]=\"applicantid_optionsEvent\"\r\n          [form]=\"mstapplicantmaster\" (selectItem)=\"onSelected_applicantid($event)\" [reportid]='MAM' [menuid]='MAM'\r\n          formControlName=\"applicantid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.applicantiddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--referencetype-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('referencetype') == -1) && (referencetypevisible==undefined || referencetypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"referencetype\" class=\"control-label required\">Reference Type</label>\r\n        <select *ngIf=\"!showview\" id=\"referencetype\" required (change)=\"referencetype_onChange($event.target)\"\r\n          formControlName=\"referencetype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of referencetype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.referencetypedesc?.value}}</label>\r\n        <app-field-error-display [displayError]=\"f.referencetype.errors?.required\"\r\n          errorMsg=\"Enter {{'Reference Type' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('referencename') == -1) && (referencenamevisible==undefined || referencenamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"referencename\" class=\"control-label required\">Reference Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.referencename?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"referencename\" required formControlName=\"referencename\" class=\"form-control\">\r\n        <app-field-error-display [displayError]=\"f.referencename.errors?.required\"\r\n          errorMsg=\"Enter {{'Reference Name' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('companyname') == -1) && (companynamevisible==undefined || companynamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"companyname\" class=\"control-label required\">Company Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.companyname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"companyname\" required formControlName=\"companyname\" class=\"form-control\">\r\n        <app-field-error-display [displayError]=\"f.companyname.errors?.required\"\r\n          errorMsg=\"Enter {{'Company Name' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('designation') == -1) && (designationvisible==undefined || designationvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"designation\" class=\"control-label\">Designation</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.designation?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"designation\" formControlName=\"designation\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('mobilenumber') == -1) && (mobilenumbervisible==undefined || mobilenumbervisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"mobilenumber\" class=\"control-label\">Mobile Number</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.mobilenumber?.value}}</label>\r\n        <int-phone-prefix *ngIf=\"!showview\" id=\"mobilenumber\" formControlName=\"mobilenumber\" [locale]=\"'en'\"\r\n          [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n        </int-phone-prefix>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('email') == -1) && (emailvisible==undefined || emailvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"email\" class=\"control-label required\">Email</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.email?.value}}</label>\r\n        <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"email\" required formControlName=\"email\"\r\n          class=\"form-control\">\r\n        <app-field-error-display [displayError]=\"f.email.errors!=null && f.email.errors?.email\"\r\n          errorMsg=\"Enter valid email\">\r\n        </app-field-error-display>\r\n        <app-field-error-display [displayError]=\"f.email.errors?.required\" errorMsg=\"Enter {{'Email' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('knownduration') == -1) && (knowndurationvisible==undefined || knowndurationvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"knownduration\" class=\"control-label\">Known Duration</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.knownduration?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"knownduration\" formControlName=\"knownduration\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('isrelative') == -1) && (isrelativevisible==undefined || isrelativevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"isrelative\" class=\"control-label\">Is Relative</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.isrelative?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"isrelative\" formControlName=\"isrelative\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('remarks') == -1) && (remarksvisible==undefined || remarksvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"remarks\" class=\"control-label\">Remarks</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.remarks?.value}}</label>\r\n        <p-editor *ngIf=\"!showview\" id=\"remarks\" formControlName=\"remarks\" [style]=\"{  height: '320' }\"></p-editor>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"hidelist.indexOf('requestid') == -1 && f.requestid.value !=null\" class=\"col-3 \">\r\n        <button class=\"btn btn-link\" (click)=\"viewrequestid()\" type=\"button\"><i class=\"fa fa-external-link\"></i>\r\n          View Request</button>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.requestid?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--referenceacceptance-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('referenceacceptance') == -1) && (referenceacceptancevisible==undefined || referenceacceptancevisible==true)) && showRefAcept\"\r\n        style='' class=\"col-3\"><label for=\"referenceacceptance\" class=\"control-label\">Reference Acceptance</label>\r\n        <select *ngIf=\"!showview\" id=\"referenceacceptance\" (change)=\"referenceacceptance_onChange($event.target)\"\r\n          formControlName=\"referenceacceptance\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of referenceacceptance_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.referenceacceptancedesc?.value}}</label>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n  </div>\r\n</form>\r\n");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_mstapplicantreferencedetail_mstapplicantr-c7190a.js.map