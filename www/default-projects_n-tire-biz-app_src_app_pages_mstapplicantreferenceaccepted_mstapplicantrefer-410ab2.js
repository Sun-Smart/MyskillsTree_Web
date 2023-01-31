"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_mstapplicantreferenceaccepted_mstapplicantrefer-410ab2"],{

/***/ 171:
/*!************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/mstapplicantreferenceaccepted/mstapplicantreferenceaccepted.component.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MstapplicantreferenceacceptedComponent": () => (/* binding */ MstapplicantreferenceacceptedComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantreferenceaccepted_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./mstapplicantreferenceaccepted.component.html */ 30726);
/* harmony import */ var _service_mstapplicantreferencerequest_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../service/mstapplicantreferencerequest.service */ 73017);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions


//Shortcuts

//translator



//primeng services



//session,application constants




//custom fields & attachments

let MstapplicantreferenceacceptedComponent = class MstapplicantreferenceacceptedComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, mstapplicantreferencerequest_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.mstapplicantreferencerequest_service = mstapplicantreferencerequest_service;
        this.fb = fb;
        this.sharedService = sharedService;
        this.sessionService = sessionService;
        this.toastr = toastr;
        this.sanitizer = sanitizer;
        this.currentRoute = currentRoute;
        this.spinner = spinner;
        this.bcompanyentry = false;
        this.bapplicantentry = false;
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
        this.bfilterPopulate_mstapplicantreferencerequests = false;
        this.mstapplicantreferencerequest_menuactions = [];
        this.applicantid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.requestmasterdatatypeidvisible = false;
        this.applicantidvisible = false;
        this.sentvisible = false;
        this.receivedvisible = false;
        this.referencedatevisible = false;
        this.referenceacceptancevisible = false;
        this.referenceremarksvisible = false;
        this.requestmasteridvisible = false;
        this.contactuseridvisible = false;
        this.showhidedate = true;
        this.showhideremarks = true;
        this.showhidereference = true;
        this.loadinghide = false;
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
        this.mstapplicantreferencerequest_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            applicantid: [null],
            applicantiddesc: [null],
            requestid: [null],
            requestmasterdatatypeid: [null],
            requestmasterdatatypeiddesc: [null],
            requestmasterid: [null],
            requestreferencedate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required])],
            requestedcontact: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(/^[a-zA-Z ]*$/)])],
            contactdesignation: [null],
            contactemailid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required])],
            contactmobile: [null],
            contactuserid: [null],
            requestremarks: [null],
            referencedate: [null],
            referencesourcedetails: [null],
            referenceacceptance: [null],
            referenceacceptancedesc: [null],
            referenceremarks: [null],
            contactfileattach: [null],
            sent: [null],
            received: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.mstapplicantreferencerequest_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.mstapplicantreferencerequest_Form.dirty && this.mstapplicantreferencerequest_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.requestid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.requestid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.requestid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            // let checkUser = localStorage.getItem('role');
            // if (checkUser == '2') {
            //   this.showHideEdit = false;
            // } else if (localStorage.getItem('3')) {
            //   this.showHideEdit = true;
            // } else if (localStorage.getItem('1')) {
            //   this.showHideEdit = true;
            // }
            //session & theme
            this.themeService.theme.subscribe((val) => {
                this.theme = val;
            });
            // this.sessionData = this.sessionService.getSession();
            // if (this.sessionData != null) {
            //   this.SESSIONUSERID = this.sessionData.userid;
            // }
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
            let mstapplicantreferencerequestid = null;
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
            this.formid = mstapplicantreferencerequestid;
            //alert(mstapplicantreferencerequestid);
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
            this.mstapplicantreferencerequest_service.getDefaultDataaccepted().subscribe(res => {
                debugger;
                this.applicantid_List = res.list_applicantid.value;
                this.requestmasterdatatypeid_List = res.list_requestmasterdatatypeid.value;
                this.referenceacceptance_List = res.list_referenceacceptance.value;
            });
            //autocomplete
            this.mstapplicantreferencerequest_service.get_mstapplicantreferencerequests_Listaccepted().subscribe(res => {
                debugger;
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            });
            //setting the flag that the screen is not touched
            this.mstapplicantreferencerequest_Form.markAsUntouched();
            this.mstapplicantreferencerequest_Form.markAsPristine();
        });
    }
    onSelected_applicantid(applicantidDetail) {
        if (applicantidDetail.value && applicantidDetail) {
            this.mstapplicantreferencerequest_Form.patchValue({
                applicantid: applicantidDetail.value,
                applicantiddesc: applicantidDetail.label,
            });
        }
    }
    // getcontactfileattach() {
    //   debugger;
    //   if (this.contactfileattach.getAttachmentList().length > 0) {
    //     let file = this.contactfileattach.getAttachmentList()[0];
    //     this.sharedService.geturl(file.filekey, file.type);
    //   }
    // }
    resetForm() {
        if (this.mstapplicantreferencerequest_Form != null)
            this.mstapplicantreferencerequest_Form.reset();
        this.mstapplicantreferencerequest_Form.patchValue({});
        this.mstapplicantreferencerequest_Form.patchValue({
            requestreferencedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            referencedate: this.ngbDateParserFormatter.parse(new Date().toString()),
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        this.requestmasterdatatypeidvisible = false;
        this.applicantidvisible = false;
        this.sentvisible = false;
        this.receivedvisible = false;
        this.referencedatevisible = false;
        this.referenceacceptancevisible = false;
        this.referenceremarksvisible = false;
        this.requestmasteridvisible = false;
        this.contactuseridvisible = false;
    }
    onDelete() {
        let requestid = this.mstapplicantreferencerequest_Form.get('requestid').value;
        if (requestid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstapplicantreferencerequest_service.delete_mstapplicantreferencerequestaccepted(requestid).subscribe(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.mstapplicantreferencerequest_Form.patchValue({
            requestid: null
        });
        if (this.formData.requestid != null)
            this.formData.requestid = null;
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
                    else if (key == "requestreferencedate")
                        this.mstapplicantreferencerequest_Form.patchValue({ "requestreferencedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "referencedate")
                        this.mstapplicantreferencerequest_Form.patchValue({ "referencedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.mstapplicantreferencerequest_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstapplicantreferencerequest_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstapplicantreferencerequest_Form.controls[key] != undefined) {
                                this.mstapplicantreferencerequest_Form.controls[key].disable({ onlySelf: true });
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
    requestmasterdatatypeid_onChange(evt) {
        let e = evt.value;
        this.mstapplicantreferencerequest_Form.patchValue({ requestmasterdatatypeiddesc: evt.options[evt.options.selectedIndex].text });
    }
    referenceacceptance_onChange(evt) {
        let e = this.f.referenceacceptance.value;
        this.mstapplicantreferencerequest_Form.patchValue({ referenceacceptancedesc: evt.options[evt.options.selectedIndex].text });
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
    edit_mstapplicantreferencerequests() {
        this.showview = false;
        setTimeout(() => {
            if (this.contactfileattach != null && this.contactfileattach != undefined)
                this.contactfileattach.setattachmentlist(this.mstapplicantreferencerequest_Form.get('contactfileattach').value);
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.spinner.show();
            this.mstapplicantreferencerequest_service.get_mstapplicantreferencerequests_ByEIDaccepted(pkcol).subscribe(res => {
                this.spinner.hide();
                this.showhidedetails = res.completelist;
                if (res.completelist[0] == 'False') {
                    this.showhidedate = true;
                    this.showhideremarks = true;
                    this.showhidereference = true;
                }
                else if (res.completelist[0] == 'true') {
                    this.showhidedate = false;
                    this.showhideremarks = false;
                    this.showhidereference = false;
                    this.showSubmit = !this.showSubmit;
                }
                this.formData = res.mstapplicantreferencerequest;
                let formproperty = res.mstapplicantreferencerequest.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.mstapplicantreferencerequest.pkcol;
                this.formid = res.mstapplicantreferencerequest.requestid;
                this.FillData(res);
            });
        });
    }
    FillData(res) {
        var _a;
        debugger;
        this.formData = res.mstapplicantreferencerequest;
        this.formid = res.mstapplicantreferencerequest.requestid;
        this.pkcol = res.mstapplicantreferencerequest.pkcol;
        this.bmyrecord = false;
        // if ((res.mstapplicantreferencerequest as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.mstapplicantreferencerequest_Form.patchValue({
            applicantid: res.mstapplicantreferencerequest.applicantid,
            applicantiddesc: res.mstapplicantreferencerequest.applicantiddesc,
            requestid: res.mstapplicantreferencerequest.requestid,
            requestmasterdatatypeid: res.mstapplicantreferencerequest.requestmasterdatatypeid,
            requestmasterdatatypeiddesc: res.mstapplicantreferencerequest.requestmasterdatatypeiddesc,
            requestmasterid: res.mstapplicantreferencerequest.requestmasterid,
            requestreferencedate: this.ngbDateParserFormatter.parse(res.mstapplicantreferencerequest.requestreferencedate),
            requestedcontact: res.mstapplicantreferencerequest.requestedcontact,
            contactdesignation: res.mstapplicantreferencerequest.contactdesignation,
            contactemailid: res.mstapplicantreferencerequest.contactemailid,
            contactmobile: res.mstapplicantreferencerequest.contactmobile,
            contactuserid: res.mstapplicantreferencerequest.contactuserid,
            requestremarks: res.mstapplicantreferencerequest.requestremarks,
            referencedate: this.ngbDateParserFormatter.parse(res.mstapplicantreferencerequest.referencedate),
            referenceacceptance: res.mstapplicantreferencerequest.referenceacceptance,
            referenceacceptancedesc: res.mstapplicantreferencerequest.referenceacceptancedesc,
            referenceremarks: res.mstapplicantreferencerequest.referenceremarks,
            referencesourcedetails: (_a = res.referencesourcedetails) === null || _a === void 0 ? void 0 : _a.details,
            contactfileattach: JSON.parse(res.mstapplicantreferencerequest.contactfileattach),
            sent: res.mstapplicantreferencerequest.sent,
            received: res.mstapplicantreferencerequest.received,
            attachment: JSON.parse(res.mstapplicantreferencerequest.attachment),
            status: res.mstapplicantreferencerequest.status,
            statusdesc: res.mstapplicantreferencerequest.statusdesc,
        });
        // if (this.sessionService.getItem("role") != '1' && res.mstapplicantreferencerequest.contactuserid != this.SESSIONUSERID && res.mstapplicantreferencerequest.applicantid != this.sessionService.getItem("applicantid")) {
        //   this.toastr.addSingle("No View", "", "You are not an Admin, Applicant or Referencer to view this record.Going back to home");
        //   this.router.navigate(['/home']);
        //   return;
        // }
        // else
        // if (this.sessionService.getItem("role") == "") {
        this.bcompanyentry = true;
        this.bapplicantentry = true;
        // }
        if (res.mstapplicantreferencerequest.referenceacceptance == "A" || res.mstapplicantreferencerequest.referenceacceptance == "R") {
            this.bcompanyentry = true;
            this.bapplicantentry = true;
        }
        else if (this.sessionService.getItem("role") == '' && res.mstapplicantreferencerequest.applicantid == res.mstapplicantreferencerequest.applicantid) {
            this.bcompanyentry = true;
        }
        else if (res.mstapplicantreferencerequest.contactuserid) {
            this.bapplicantentry = true;
        }
        else {
            this.bcompanyentry = true;
            this.bapplicantentry = true;
        }
        this.requestmasterdatatypeidvisible = false;
        this.applicantidvisible = false;
        this.sentvisible = false;
        this.receivedvisible = false;
        this.referencedatevisible = false;
        this.referenceacceptancevisible = false;
        this.referenceremarksvisible = false;
        this.requestmasteridvisible = false;
        this.contactuseridvisible = false;
        //hide list
        if (res.visiblelist != undefined && res.visiblelist.indexOf("requestmasterdatatypeid") >= 0)
            this.requestmasterdatatypeidvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("requestmasterdatatypeid") >= 0)
            this.requestmasterdatatypeidvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("applicantid") >= 0)
            this.applicantidvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("applicantid") >= 0)
            this.applicantidvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("sent") >= 0)
            this.sentvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("sent") >= 0)
            this.sentvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("received") >= 0)
            this.receivedvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("received") >= 0)
            this.receivedvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("referencedate") >= 0)
            this.referencedatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("referencedate") >= 0)
            this.referencedatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("referenceacceptance") >= 0)
            this.referenceacceptancevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("referenceacceptance") >= 0)
            this.referenceacceptancevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("referenceremarks") >= 0)
            this.referenceremarksvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("referenceremarks") >= 0)
            this.referenceremarksvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("requestmasterid") >= 0)
            this.requestmasteridvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("requestmasterid") >= 0)
            this.requestmasteridvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("contactuserid") >= 0)
            this.contactuseridvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("contactuserid") >= 0)
            this.contactuseridvisible = false;
        this.mstapplicantreferencerequest_menuactions = res.mstapplicantreferencerequest_menuactions;
        if (this.mstapplicantreferencerequest_Form.get('contactfileattach').value != null && this.mstapplicantreferencerequest_Form.get('contactfileattach').value != "" && this.contactfileattach != null && this.contactfileattach != undefined)
            this.contactfileattach.setattachmentlist(this.mstapplicantreferencerequest_Form.get('contactfileattach').value);
        if (this.mstapplicantreferencerequest_Form.get('attachment').value != null && this.mstapplicantreferencerequest_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.mstapplicantreferencerequest_Form.get('attachment').value);
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.mstapplicantreferencerequest_Form.controls) {
            let val = this.mstapplicantreferencerequest_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.mstapplicantreferencerequest_Form.controls[key] != null) {
                if (key == "contactfileattach") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__.AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.mstapplicantreferencerequest_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.mstapplicantreferencerequest_Form.getRawValue();
            obj.requestreferencedate = new Date(this.mstapplicantreferencerequest_Form.get('requestreferencedate').value ? this.ngbDateParserFormatter.format(this.mstapplicantreferencerequest_Form.get('requestreferencedate').value) + '  UTC' : null);
            obj.referencedate = new Date(this.mstapplicantreferencerequest_Form.get('referencedate').value ? this.ngbDateParserFormatter.format(this.mstapplicantreferencerequest_Form.get('referencedate').value) + '  UTC' : null);
            // if (this.contactfileattach.getAttachmentList() != null) obj.contactfileattach = JSON.stringify(this.contactfileattach.getAttachmentList());
            if (this.fileattachment.getAttachmentList() != null)
                obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            obj.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(obj);
            // await this.sharedService.upload(this.contactfileattach.getAllFiles());
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
            // Object.keys(this.mstapplicantreferencerequest_Form.controls).forEach(key => {
            //   const controlErrors: ValidationErrors = this.mstapplicantreferencerequest_Form.get(key).errors;
            //   if (controlErrors != null) {
            //     Object.keys(controlErrors).forEach(keyError => {
            //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //     });
            //   }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.mstapplicantreferencerequest_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.mstapplicantreferencerequest_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.mstapplicantreferencerequest_Form.controls[key] != null) {
                            this.formData[key] = this.mstapplicantreferencerequest_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.requestreferencedate = new Date(this.mstapplicantreferencerequest_Form.get('requestreferencedate').value ? this.ngbDateParserFormatter.format(this.mstapplicantreferencerequest_Form.get('requestreferencedate').value) + '  UTC' : null);
            this.formData.referencedate = new Date(this.mstapplicantreferencerequest_Form.get('referencedate').value ? this.ngbDateParserFormatter.format(this.mstapplicantreferencerequest_Form.get('referencedate').value) + '  UTC' : null);
            this.formData.contactfileattach = this.mstapplicantreferencerequest_Form.get('contactfileattach').value;
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            // if (this.contactfileattach.getAttachmentList() != null) this.formData.contactfileattach = JSON.stringify(this.contactfileattach.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            // this.spinner.show();
            this.loadinghide = true;
            this.mstapplicantreferencerequest_service.saveOrUpdate_mstapplicantreferencerequestsaccepted(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                // await this.sharedService.upload(this.contactfileattach.getAllFiles());
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                //this.spinner.hide();
                this.loadinghide = false;
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                window.location.reload();
                this.objvalues.push(res.mstapplicantreferencerequest);
                if (!bclear)
                    this.showview = true;
                // if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
                if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.dialogRef.close(this.objvalues);
                    return;
                }
                else {
                    // if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
                }
                this.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.objvalues.push(res.mstapplicantreferencerequest);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstapplicantreferencerequest_Form.markAsUntouched();
                this.mstapplicantreferencerequest_Form.markAsPristine();
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
MstapplicantreferenceacceptedComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_12__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DialogService },
    { type: _service_mstapplicantreferencerequest_service__WEBPACK_IMPORTED_MODULE_1__.mstapplicantreferencerequestService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_19__.NgxSpinnerService }
];
MstapplicantreferenceacceptedComponent.propDecorators = {
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild, args: ['fileattachment', { static: false },] }],
    contactfileattach: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild, args: ['contactfileattach', { static: false },] }]
};
MstapplicantreferenceacceptedComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-mstapplicantreferenceaccepted',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantreferenceaccepted_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService]
    })
], MstapplicantreferenceacceptedComponent);



/***/ }),

/***/ 30726:
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/mstapplicantreferenceaccepted/mstapplicantreferenceaccepted.component.html ***!
  \*****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n\r\n<form [formGroup]=\"mstapplicantreferencerequest_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second  second2 common_title_style\">\r\n    <h1 class=\"col-4 columns mainheader left\">{{'Reference Requests'}}\r\n    </h1>\r\n    <div class='col  sticky1 second second2 common_header_clr' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li *ngIf=\"checkUser\"><a class='alert-info' [routerLink]='' *ngIf='showview'\r\n              (click)=\"edit_mstapplicantreferencerequests()\"><i class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of mstapplicantreferencerequest_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader common_title_style' *ngIf=\"!showview\">\r\n            <!-- <a class=\"alert-success\" [routerLink]=''>  -->\r\n            <button type=\"button\" class=\"btn btn-outline-primary popup-add-button\" (click)=\"onSubmitAndWait()\" *ngIf=\"showSubmit==true\">Submit</button>&nbsp;\r\n            <!-- <a class=\"alert-primary common_title_style\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a> -->\r\n            <!-- <button type=\"button\" class=\"btn btn-outline-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null'\r\n              style=\"border-color: #fff !important;\r\n              color: #fff;margin: 5px;\r\n    padding: 3px;\" (click)=\"onSubmit()\">Submit & Clear</button>&nbsp; -->\r\n            <app-action *ngIf=\"f.requestid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.requestid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <i class='nav-item actionheader common_title_style'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\"\r\n            class=\"fa fa-times-circle close_common_icon2\" (click)=\"onClose()\"></i>\r\n          <!-- <li class='nav-item actionheader common_title_style' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\"  style='background: #0368b7 !important;' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary common_title_style\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.requestid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.requestid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li> -->\r\n          <!-- <li class='nav-item actionheader common_title_style'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li> -->\r\n          <!-- <i class='nav-item actionheader common_title_style'\r\n          *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\"\r\n          class=\"fa fa-times-circle close_common_icon2\" (click)=\"onClose()\"></i> -->\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n\r\n\r\n    <!--applicantid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"applicantidvisible==undefined || applicantidvisible==true\" style='' class=\"col-3\"><label\r\n          for=\"applicantid\" class=\"control-label\" (click)=\"AddOrEdit_applicantid(null)\">Applicant</label>\r\n        <app-popupselect *ngIf=\"!(showview || bapplicantentry)\" [options]=\"applicantid_List\"\r\n          [optionsEvent]=\"applicantid_optionsEvent\" [form]=\"mstapplicantmaster\"\r\n          (selectItem)=\"onSelected_applicantid($event)\" [reportid]='MAM' [menuid]='MAM' formControlName=\"applicantid\"\r\n          id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"(showview || bapplicantentry)\" class=\"labelview\">{{f.applicantiddesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--requestmasterdatatypeid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"requestmasterdatatypeidvisible==undefined || requestmasterdatatypeidvisible==true\" style=''\r\n        class=\"col-3\"><label for=\"requestmasterdatatypeid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_requestmasterdatatypeid(null)\" (click)=\"AddOrEdit_requestmasterdatatypeid(null)\">Data\r\n          Type</label>\r\n        <select *ngIf=\"!(showview || bapplicantentry)\" id=\"requestmasterdatatypeid\"\r\n          (change)=\"requestmasterdatatypeid_onChange($event.target)\" formControlName=\"requestmasterdatatypeid\"\r\n          class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of requestmasterdatatypeid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"(showview || bapplicantentry)\" class=\"labelview\">{{f.requestmasterdatatypeiddesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"requestmasteridvisible==undefined || requestmasteridvisible==true\" style='' class=\"col-3 \">\r\n        <label for=\"requestmasterid\" class=\"control-label\">Request Masterid</label>\r\n        <label *ngIf=\"(showview || bapplicantentry)\" class=\"labelview\">{{f.requestmasterid?.value}}</label>\r\n        <input *ngIf=\"!(showview || bapplicantentry)\" id=\"requestmasterid\" formControlName=\"requestmasterid\"\r\n          class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"requestreferencedatevisible==undefined || requestreferencedatevisible==true\" class=\"col-lg-4 col-md-4 col-sm-12 col-xs-12 respon_date\">\r\n        <label for=\"requestreferencedate\" class=\"control-label required\">Date</label>\r\n        <br/>\r\n        <label *ngIf=\"(showview || bapplicantentry)\"\r\n          class=\"labelview\">{{ngbDateParserFormatter.format(f.requestreferencedate?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!(showview || bapplicantentry)\">\r\n          <input #requestreferencedateformpicker=\"ngbDatepicker\" [minDate]='{year: 1950, month:1, day: 1}'\r\n            [maxDate]='{year: 2030, month:12, day: 31}' ngbDatepicker name=\"requestreferencedateformpicker\"\r\n            id=\"requestreferencedate\" required formControlName=\"requestreferencedate\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!(showview || bapplicantentry)\"\r\n            (click)=\"requestreferencedateformpicker.toggle()\" type=\"button\"><i class=\"fa fa-calendar\"\r\n              aria-hidden=\"true\"></i></button>\r\n        </div>\r\n        <app-field-error-display [displayError]=\"f.requestreferencedate.errors?.required\"\r\n          errorMsg=\"Enter {{'Date' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div *ngIf=\"requestedcontactvisible==undefined || requestedcontactvisible==true\" class=\"col-lg-4 col-md-4 col-sm-12 col-xs-12 \">\r\n        <label for=\"requestedcontact\" class=\"control-label required\">Contact Person</label><br/>\r\n        <label *ngIf=\"(showview || bapplicantentry)\" class=\"labelview\">{{f.requestedcontact?.value}}</label>\r\n        <input *ngIf=\"!(showview || bapplicantentry)\" id=\"requestedcontact\" required formControlName=\"requestedcontact\"\r\n          class=\"form-control\">\r\n        <app-field-error-display [displayError]=\"f.requestedcontact.errors?.required\"\r\n          errorMsg=\"Enter {{'Contact' | translate}}\">\r\n        </app-field-error-display>\r\n        <app-field-error-display [displayError]=\"f.requestedcontact.errors?.pattern\"\r\n          errorMsg=\"{{'Contact' | translate}} not valid\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div *ngIf=\"contactdesignationvisible==undefined || contactdesignationvisible==true\" class=\"col-lg-4 col-md-4 col-sm-12 col-xs-12\">\r\n        <label for=\"contactdesignation\" class=\"control-label\">Designation</label><br/>\r\n        <label *ngIf=\"(showview || bapplicantentry)\" class=\"labelview\">{{f.contactdesignation?.value}}</label>\r\n        <input *ngIf=\"!(showview || bapplicantentry)\" id=\"contactdesignation\" formControlName=\"contactdesignation\"\r\n          class=\"form-control\">\r\n        <!-- <app-field-error-display [displayError]=\"f.contactdesignation.errors?.required\"\r\n          errorMsg=\"Enter {{'Designation' | translate}}\">\r\n        </app-field-error-display> -->\r\n      </div>\r\n      <div *ngIf=\"contactemailidvisible==undefined || contactemailidvisible==true\" class=\"col-lg-4 col-md-4 col-sm-12 col-xs-12\">\r\n        <label for=\"contactemailid\" class=\"control-label required\">Email</label><br/>\r\n        <label *ngIf=\"(showview || bapplicantentry)\" class=\"labelview\">{{f.contactemailid?.value}}</label>\r\n        <input type=\"email\" [email]=\"true\" *ngIf=\"!(showview || bapplicantentry)\" id=\"contactemailid\"\r\n          formControlName=\"contactemailid\" class=\"form-control\" required>\r\n        <app-field-error-display [displayError]=\"f.contactemailid.errors?.required\"\r\n          errorMsg=\"Enter {{'email' | translate}}\">\r\n        </app-field-error-display>\r\n        <app-field-error-display [displayError]=\"f.contactemailid.errors!=null && f.contactemailid.errors?.email\"\r\n          errorMsg=\"Enter valid email\">\r\n        </app-field-error-display>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"contactmobilevisible==undefined || contactmobilevisible==true\" class=\"col-lg-4 col-md-4 col-sm-12 col-xs-12\">\r\n        <label for=\"contactmobile\" class=\"control-label\">Mobile</label><br/>\r\n        <label *ngIf=\"(showview || bapplicantentry)\" class=\"labelview\">{{f.contactmobile?.value}}</label>\r\n        <int-phone-prefix *ngIf=\"!(showview || bapplicantentry)\" id=\"contactmobile\" formControlName=\"contactmobile\"\r\n          [locale]=\"'en'\" class=\"form-control telephone\">\r\n        </int-phone-prefix>\r\n      </div>\r\n      <div *ngIf=\"contactuseridvisible==undefined || contactuseridvisible==true\" class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <label for=\"contactuserid\" class=\"control-label\">Contact User</label><br/>\r\n        <label *ngIf=\"(showview || bapplicantentry)\" class=\"labelview\">{{f.contactuserid?.value}}</label>\r\n        <input *ngIf=\"!(showview || bapplicantentry)\" id=\"contactuserid\" formControlName=\"contactuserid\"\r\n          class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"requestremarksvisible==undefined || requestremarksvisible==true\" style='width:1500px' class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\r\n        <label for=\"requestremarks\" class=\"control-label\">Request Remarks</label><br/>\r\n        <label *ngIf=\"(showview || bapplicantentry)\" class=\"labelview\">{{f.requestremarks?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!(showview || bapplicantentry)\"\r\n          id=\"requestremarks\" formControlName=\"requestremarks\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group row\">\r\n      <div style='' class=\"col-lg-4 col-md-3 col-sm-12 col-xs-12\">\r\n        <label for=\"referencedate\" class=\"control-label\">Reference Date</label><br/>\r\n        <label *ngIf=\"!showhidedate\" class=\"labelview\">{{ngbDateParserFormatter.format(f.referencedate?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"showhidedate\">\r\n          <input #referencedateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"referencedateformpicker\" id=\"referencedate\"\r\n            formControlName=\"referencedate\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" (click)=\"referencedateformpicker.toggle()\" type=\"button\"><i\r\n              class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--referenceacceptance-->\r\n\r\n    <div class=\"form-group row\">\r\n      <div style='' class=\"col-lg-4 col-md-3 col-sm-12 col-xs-12\">\r\n        <label for=\"referenceacceptance\" class=\"control-label\">Reference Acceptance</label>\r\n        <select id=\"referenceacceptance\" (change)=\"referenceacceptance_onChange($event.target)\"\r\n          formControlName=\"referenceacceptance\" class=\"form-control\" *ngIf=\"showhidereference\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of referenceacceptance_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select><br/>\r\n        <label *ngIf=\"!showhidereference\" class=\"labelview\">{{f.referenceacceptancedesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"referenceremarksvisible==undefined || referenceremarksvisible==true\" style='width:1500px'\r\n        class=\"col-12\">\r\n        <label for=\"referenceremarks\" class=\"control-label\">Reference Remarks</label>\r\n        <label *ngIf=\"!showhideremarks\" class=\"labelview\">{{f.referenceremarks?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" id=\"referenceremarks\"\r\n          formControlName=\"referenceremarks\" class=\"form-control\" *ngIf=\"showhideremarks\">\r\n        </textarea>\r\n      </div>\r\n    </div>\r\n    <br />\r\n    <div class=\"alert alert-success\" role=\"alert\"\r\n      style=\"color: #000 !important;background: #fff !important;width: 100% !important;height: auto !important;\"\r\n      *ngIf=\"(viewhtml == '' || !showview)\" innerHtml=\"{{f.referencesourcedetails?.value}}\">\r\n\r\n    </div>\r\n    <br />\r\n    <!-- <div class=\"card form-group row blue\" style=\"width: 100% !important;height: auto !important;\" *ngIf=\"(viewhtml == '' || !showview)\">\r\n      <div class=\"card-body\" innerHtml=\"{{f.referencesourcedetails?.value}}\">\r\n      </div>\r\n    </div> -->\r\n\r\n    <!-- <div *ngIf=\"(viewhtml == '' || !showview)\" class=\"form-group row blue\"\r\n      innerHtml=\"{{f.referencesourcedetails?.value}}\">\r\n    </div> -->\r\n\r\n\r\n    <!-- <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\" style=\"display: none !important;\">\r\n      <div *ngIf=\"contactfileattachvisible==undefined || contactfileattachvisible==true\" style='width:1500px'\r\n        class=\"col-12 \">\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.contactfileattach?.value[0]?.name}}</label>\r\n        <app-attachment #contactfileattach formControlName=\"contactfileattach\" [showremove]='bmyrecord'\r\n          [SessionData]=\"sessionData\"></app-attachment>\r\n        <button type=\"button\" class=\"btn\" *ngIf=\"contactfileattach.getAttachmentList().length > 0\"\r\n          (click)=\"getcontactfileattach()\">Download File</button>\r\n      </div>\r\n    </div> -->\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"sentvisible==undefined || sentvisible==true\" style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"sent\" class=\"control-label\">Sent</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.sent?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"sent\" formControlName=\"sent\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"receivedvisible==undefined || receivedvisible==true\" style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"received\" class=\"control-label\">Received</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.received?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"received\" formControlName=\"received\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n  </div>\r\n</form>\r\n<div class=\"loading\" *ngIf=\"loadinghide\">\r\n  <div class=\"loader\"></div>\r\n</div>\r\n<!-- <div  *ngIf=\"loadinghide\" style=\"display: block !important;\r\nposition: absolute !important;\r\nbottom: 0;\r\ntop: 0;\r\nleft: 0;\r\nwidth: 100%;\r\nopacity: 0.5;\r\nright: 0;\r\nbackground: transparent !important;\r\nbackground-color: gray !important;\">\r\n<img src=\"../../../assets/loader.gif\" style=\"position: absolute;bottom: 0;\r\ntop: 0;\r\nleft: 0;right: 0;vertical-align: middle;\" width=\"50px\" height=\"50px\"/>\r\n</div> -->\r\n<!-- <ngx-spinner></ngx-spinner> -->\r\n<!-- <div *ngIf=\"loadinghide\">\r\n  <h3 style=\"color: red;text-align: center;color: red;\r\n  text-align: center;\r\n  font-size: 30px !important;\r\n  position: absolute;\r\n  left: 0 !important;\r\n  right: 0;top: 40%;\r\n  bottom: 0%;\"><img src=\"assets/loading.gif\" style=\"width: 15%;height: 34%;\" />Please wait page is loading...!</h3>\r\n\r\n</div> -->\r\n");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_mstapplicantreferenceaccepted_mstapplicantrefer-410ab2.js.map