"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_pages_module_ts"],{

/***/ 6982:
/*!****************************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantskilldetailsattachment/mstapplicantskilldetailsattachment.component.ts ***!
  \****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MstapplicantskilldetailsattachmentComponent": () => (/* binding */ MstapplicantskilldetailsattachmentComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantskilldetailsattachment_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./mstapplicantskilldetailsattachment.component.html */ 17032);
/* harmony import */ var _mstapplicantskilldetailsattachment_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mstapplicantskilldetailsattachment.component.scss */ 20929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _service_mstapplicantskilldetail_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/mstapplicantskilldetail.service */ 8773);
/* harmony import */ var _service_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/shared.service */ 70041);
/* harmony import */ var _shared_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/helper */ 52538);
/* harmony import */ var _core_services_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/services/session.service */ 57318);
/* harmony import */ var _core_services_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/services/toast.service */ 82301);












let MstapplicantskilldetailsattachmentComponent = class MstapplicantskilldetailsattachmentComponent {
    constructor(fb, toastr, sharedService, dynamicconfig, spinner, sessionService, mstapplicantskilldetail_service) {
        this.fb = fb;
        this.toastr = toastr;
        this.sharedService = sharedService;
        this.dynamicconfig = dynamicconfig;
        this.spinner = spinner;
        this.sessionService = sessionService;
        this.mstapplicantskilldetail_service = mstapplicantskilldetail_service;
        this.mstapplicantreferencerequest_menuactions = [];
        this.AttachmentURL = _shared_helper__WEBPACK_IMPORTED_MODULE_4__.AppConstants.AttachmentURL;
        this.URL = _shared_helper__WEBPACK_IMPORTED_MODULE_4__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.isSubmitted = false;
        this.mstapplicantAttachment_Form = this.fb.group({
            applicantid: [this.applicantid],
            segmentid: [''],
            segmentcategoryothers: [''],
            skillcategory: [''],
            skillcategoryothers: [''],
            subcategoryid: [''],
            subcategoryidothers: [''],
            selfrating: [''],
            remarks: [''],
            attachment: ['']
        });
    }
    ngOnInit() {
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
        else {
            this.onSubmitData(true);
        }
    }
    ;
    onSubmitData(bclear) {
        debugger;
        this.isSubmitted = true;
        let strError = "";
        if (strError != "")
            return this.sharedService.alert(strError);
        if (!this.mstapplicantAttachment_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        ;
        this.formData = this.mstapplicantAttachment_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.mstapplicantAttachment_Form.controls[key] != null) {
                        this.formData[key] = this.mstapplicantAttachment_Form.controls[key].value;
                    }
                }
            }
        }
        if (this.fileattachment.getAttachmentList() != null)
            this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        // if (this.contactfileattach.getAttachmentList() != null) this.formData.contactfileattach = JSON.stringify(this.contactfileattach.getAttachmentList());
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.mstapplicantskilldetail_service.saveOrUpdate_mstapplicantskilldetails(this.formData).subscribe.subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            // await this.sharedService.upload(this.contactfileattach.getAllFiles());
            yield this.sharedService.upload(this.fileAttachmentList);
            this.attachmentlist = [];
            if (this.fileattachment)
                this.fileattachment.clear();
            this.spinner.hide();
            debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.sessionService.setItem("attachedsaved", "true");
        }));
    }
    validate() {
        let ret = true;
        return ret;
    }
};
MstapplicantskilldetailsattachmentComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormBuilder },
    { type: _core_services_toast_service__WEBPACK_IMPORTED_MODULE_6__.ToastService },
    { type: _service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_9__.DynamicDialogConfig },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_10__.NgxSpinnerService },
    { type: _core_services_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService },
    { type: _service_mstapplicantskilldetail_service__WEBPACK_IMPORTED_MODULE_2__.mstapplicantskilldetailService }
];
MstapplicantskilldetailsattachmentComponent.propDecorators = {
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ViewChild, args: ['fileattachment', { static: false },] }]
};
MstapplicantskilldetailsattachmentComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
        selector: 'app-mstapplicantskilldetailsattachment',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantskilldetailsattachment_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_mstapplicantskilldetailsattachment_component_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], MstapplicantskilldetailsattachmentComponent);



/***/ }),

/***/ 70855:
/*!***********************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/pages-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PagesRoutingModule": () => (/* binding */ PagesRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages.component */ 56584);




const routes = [{
        path: '',
        component: _pages_component__WEBPACK_IMPORTED_MODULE_0__.PagesComponent,
        children: [
            {
                path: 'forms',
                //loadChildren: () => import('../../../../n-tire-biz-app/src/app/pages/forms/forms.module').then(m => m.FormsModule),
            },
        ],
    }];
let PagesRoutingModule = class PagesRoutingModule {
};
PagesRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], PagesRoutingModule);



/***/ }),

/***/ 56584:
/*!******************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/pages.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PagesComponent": () => (/* binding */ PagesComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_service_bomenumaster_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/service/bomenumaster.service */ 49673);



let PagesComponent = class PagesComponent {
    constructor(menuService) {
        //debugger;
        // this.menuService.refreshList();
        // this.menulist=convert(this.menuService.list);
        this.menuService = menuService;
        this.menu = [];
        /*
          //  //debugger;
            this.menuService.getbomenumastersList().then((res:any) => {
              ////debugger;
              this.menulist = convert(res);
            //  console.log(this.menulist);
            //  console.log(MENU_ITEMS);
             // this.nbmenuservice.addItems(MENU_ITEMS);
              this.nbmenuservice.addItems(this.menulist);
        
          //    //debugger;
             
            });
            
        */
    }
    ngOnInit() {
    }
};
PagesComponent.ctorParameters = () => [
    { type: _n_tire_biz_app_src_app_service_bomenumaster_service__WEBPACK_IMPORTED_MODULE_0__.bomenumasterService }
];
PagesComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'ngx-pages',
        template: `
      <router-outlet></router-outlet>
  `,
    })
], PagesComponent);

function convert(array) {
    //  //debugger;
    var map = {};
    for (var i = 0; i < array.length; i++) {
        var obj;
        //obj = new MenuItem();
        obj.id = array[i].menuid;
        obj.label = array[i].menudescription;
        //  obj.icon = array[i].IconName;
        obj.url = array[i].menuurl;
        // obj.expanded = true;
        // obj.children = [];
        map[obj.id] = obj;
        var parent = array[i].parentid || '-';
        if (!map[parent]) {
            map[parent] = {
                children: []
            };
        }
        if (map[parent].children == undefined || map[parent].children == null)
            map[parent].children = [];
        map[parent].children.push(obj);
    }
    // //debugger;
    return map['-'].children;
}


/***/ }),

/***/ 93989:
/*!***************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/pages.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PagesModule": () => (/* binding */ PagesModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages.component */ 56584);
/* harmony import */ var _pages_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages-routing.module */ 70855);
/* harmony import */ var _mstapplicantreferenceaccepted_mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantreferenceaccepted/mstapplicantreferenceaccepted.component */ 171);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forgotpassword/forgotpassword.component */ 33445);
/* harmony import */ var _forms_mstapplicantskilldetailsattachment_mstapplicantskilldetailsattachment_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forms/mstapplicantskilldetailsattachment/mstapplicantskilldetailsattachment.component */ 6982);
/* harmony import */ var _certifier_certifier_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./certifier/certifier.component */ 78642);







// import { ApplicantregisterComponent } from './applicantregister/applicantregister.component';




// import { RegisterComponent } from './register/register.component';
// import { NewskillsearchComponent } from './forms/newskillsearch/newskillsearch.component';
// import { BoSkillSearchComponent } from './forms/bo-skill-search/bo-skill-search.component';
const PAGES_COMPONENTS = [
    _pages_component__WEBPACK_IMPORTED_MODULE_0__.PagesComponent,
];
let PagesModule = class PagesModule {
};
PagesModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
            _pages_routing_module__WEBPACK_IMPORTED_MODULE_1__.PagesRoutingModule,
            _angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule
        ],
        declarations: [
            ...PAGES_COMPONENTS,
            _mstapplicantreferenceaccepted_mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_2__.MstapplicantreferenceacceptedComponent,
            _forgotpassword_forgotpassword_component__WEBPACK_IMPORTED_MODULE_3__.ForgotpasswordComponent,
            _forms_mstapplicantskilldetailsattachment_mstapplicantskilldetailsattachment_component__WEBPACK_IMPORTED_MODULE_4__.MstapplicantskilldetailsattachmentComponent,
            _certifier_certifier_component__WEBPACK_IMPORTED_MODULE_5__.CertifierComponent,
            // ApplicantregisterComponent,
            // RegisterComponent,
            // NewskillsearchComponent,
            // BoSkillSearchComponent,
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_7__.NO_ERRORS_SCHEMA]
    })
], PagesModule);



/***/ }),

/***/ 17032:
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantskilldetailsattachment/mstapplicantskilldetailsattachment.component.html ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n\r\n<form [formGroup]=\"mstapplicantskilldetail_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second common_title_style\">\r\n    <h1 class=\"col-4 columns mainheader left common_titles_new\">{{'Skill Details'}}</h1>\r\n    <div class='col  sticky1 second common_header_clr' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_mstapplicantskilldetails()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <!-- <ng-container *ngFor=\"let action of mstapplicantskilldetail_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>-->\r\n          <li class='nav-item actionheader common_title_style' *ngIf=\"!showview\">\r\n            <!-- <a class=\"alert-success\" [routerLink]=''>  -->\r\n            <button type=\"button\" class=\"btn btn-outline-primary\" style=\"border-color: #000 !important;margin: 5px;\r\n              padding: 3px;\r\n              color: #000;\" (click)=\"onSubmitAndWait()\">Submit</button>&nbsp;\r\n            <!-- <a class=\"alert-primary common_title_style\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a> -->\r\n            <button type=\"button\" class=\"btn btn-outline-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null'\r\n              style=\"border-color: #000 !important;\r\n              color: #000;margin: 5px;\r\n                 padding: 3px;\" (click)=\"onSubmit()\">Submit & Clear</button>&nbsp;\r\n            <app-action *ngIf=\"f.skillid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.skillid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <i class='nav-item actionheader common_title_style'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\"\r\n            class=\"fa fa-times-circle close_common_icon2\" (click)=\"onClose()\"></i>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n\r\n\r\n    <!--applicantid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <!-- <div\r\n        *ngIf=\"((hidelist.indexOf('applicantid') == -1) && (applicantidvisible==undefined || applicantidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"applicantid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_applicantid(null)\">Applicant</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"applicantid_List\" [optionsEvent]=\"applicantid_optionsEvent\"\r\n          [form]=\"mstapplicantmaster\" (selectItem)=\"onSelected_applicantid($event)\" [reportid]='MAM' [menuid]='MAM'\r\n          formControlName=\"applicantid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.applicantiddesc?.value}}</label>\r\n      </div> -->\r\n\r\n      <!--Segmentcategory-->\r\n\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('segmentid') == -1) && (segmentcategoryvisible==undefined || segmentcategoryvisible==true))\"\r\n        style='' class=\"col-4\"><label for=\"segmentid\" class=\"control-label required\">Segments\r\n          </label>&nbsp;&nbsp;\r\n        <!-- <a [routerLink]='' (click)=\"AddOrEditsegmentcategory(null)\"> Add segment Category</a> -->\r\n        <select *ngIf=\"!showview\" id=\"segmentid\" required (change)=\"segmentcategory_onChange($event.target)\"\r\n          formControlName=\"segmentid\" class=\"form-control\">\r\n          <!-- <option [ngValue]=\"null\" disabled selected>-Select-</option> -->\r\n          <option [ngValue]=\"null\" [disabled]=\"true\">-Select-</option>\r\n          <option *ngFor=\"let item of Segmentcategory_list\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.segmentcategorydesc?.value}}</label>\r\n        <input *ngIf=\"showinput1\" class=\"form-control\" id=\"segmentid\" formControlName=\"segmentcategoryothers\"\r\n          type=\"text\">\r\n        <app-field-error-display [displayError]=\"f.segmentid.errors?.required\" errorMsg=\"Enter {{'segment Category'}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n\r\n\r\n\r\n\r\n      <!--skillcategory-->\r\n\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('skillcategory') == -1) && (skillcategoryvisible==undefined || skillcategoryvisible==true))\"\r\n        style='' class=\"col-4\"><label for=\"skillcategory\" class=\"control-label required\">Skill\r\n          Category</label>&nbsp;&nbsp;\r\n        <!-- <a [routerLink]='' (click)=\"AddOrEditskillcategory(null)\"> Add Skill Category</a> -->\r\n        <select *ngIf=\"!showview\" id=\"skillcategory\" required (change)=\"skillcategory_onChange($event.target)\"\r\n          formControlName=\"skillcategory\" class=\"form-control\">\r\n          <!-- <option [ngValue]=\"null\" disabled selected>-Select-</option> -->\r\n          <option [ngValue]=\"null\" [disabled]=\"true\">-Select-</option>\r\n          <option *ngFor=\"let item of skillcategory_List\" value=\"{{item.categoryid}}\">{{item.name}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.skillcategorydesc?.value}}</label>\r\n        <input *ngIf=\"showinput2\" class=\"form-control\" id=\"skillcategory\" formControlName=\"skillcategoryothers\"\r\n          type=\"text\">\r\n        <app-field-error-display [displayError]=\"f.skillcategory.errors?.required\"\r\n          errorMsg=\"Enter {{'Skill Category'}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n\r\n\r\n      <!--subcategoryid-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('subcategoryid') == -1) && (subcategoryidvisible==undefined || subcategoryidvisible==true))\"\r\n        style='' class=\"col-4\"><label for=\"subcategoryid\" class=\"control-label required\">Sub\r\n          Category</label>&nbsp;&nbsp;\r\n        <!-- <a [routerLink]='' (click)=\"AddOrEditskillsubcategory(null)\"> Add Sub Category</a> -->\r\n        <select *ngIf=\"!showview\" id=\"subcategoryid\" required (change)=\"subcategoryid_onChange($event.target)\"\r\n          formControlName=\"subcategoryid\" class=\"form-control\">\r\n          <!-- <option [ngValue]=\"null\" disabled selected>-Select-</option> -->\r\n          <option [ngValue]=\"null\" [disabled]=\"true\">-Select-</option>\r\n          <option *ngFor=\"let item of subcategoryid_List\" value=\"{{item.subcategoryid}}\">{{item.name}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.subcategoryiddesc?.value}}</label>\r\n        <input *ngIf=\"showinput3\" id=\"subcategoryid\" class=\"form-control\" formControlName=\"subcategoryidothers\"\r\n          type=\"text\">\r\n        <app-field-error-display [displayError]=\"f.subcategoryid.errors?.required\"\r\n          errorMsg=\"Enter {{'Sub Category' | translate}}\">\r\n        </app-field-error-display>\r\n      </div>\r\n\r\n\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('selfrating') == -1) && (selfratingvisible==undefined || selfratingvisible==true))\"\r\n        style='' class=\"col-4 \">\r\n        <label for=\"selfrating\" class=\"control-label\">Self Rating</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.selfrating?.value}}</label>\r\n        <p-rating *ngIf=\"!showview\" id=\"selfrating\" formControlName=\"selfrating\" class=\"form-control\">\r\n        </p-rating>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('showorhide') == -1) && (showorhidevisible==undefined || showorhidevisible==true))\"\r\n        style='' class=\"col-3\">\r\n        <div class=\"columnchk\">\r\n          <br />\r\n          <label for=\"showorhide\" class=\"control-label\">Hide &nbsp;&nbsp;<br />\r\n            <input type=\"checkbox\" *ngIf=\"!showview\" id=\"showorhide\" formControlName=\"showorhide\"\r\n              class=\"form-control\"></label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.showorhide?.value}}</label>\r\n          <!-- <p-inputSwitch formControlName=\"showorhide\" *ngIf=\"!showview\" id=\"showorhide\"></p-inputSwitch> -->\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('remarks') == -1) && (remarksvisible==undefined || remarksvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"remarks\" class=\"control-label\">Remarks</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.remarks?.value}}</label>\r\n        <p-editor *ngIf=\"!showview\" id=\"remarks\" formControlName=\"remarks\" [style]=\"{  height: '320' }\"></p-editor>\r\n      </div>\r\n    </div>\r\n    <!-- <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"hidelist.indexOf('requestid') == -1 && f.requestid.value !=null\" class=\"col-3 \">\r\n        <button class=\"btn btn-link\" (click)=\"viewrequestid()\" type=\"button\"><i class=\"fa fa-external-link\"></i>\r\n          View Request</button>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.requestid?.value}}</label>\r\n      </div>\r\n    </div> -->\r\n\r\n\r\n    <!--referenceacceptance-->\r\n\r\n    <!-- <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('referenceacceptance') == -1) && (referenceacceptancevisible==undefined || referenceacceptancevisible==true)) || f.requestid.value !=null\"\r\n        style='' class=\"col-3\"><label for=\"referenceacceptance\" class=\"control-label\">Reference Acceptance</label>\r\n        <input readonly id=\"referenceacceptancedesc\" formControlName=\"referenceacceptancedesc\" class=\"form-control\">\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.referenceacceptancedesc?.value}}</label>\r\n      </div>\r\n    </div> -->\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n  </div>\r\n</form>\r\n\r\n<p-toast position=\"bottom-center\"></p-toast>");

/***/ }),

/***/ 20929:
/*!******************************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantskilldetailsattachment/mstapplicantskilldetailsattachment.component.scss ***!
  \******************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtc3RhcHBsaWNhbnRza2lsbGRldGFpbHNhdHRhY2htZW50LmNvbXBvbmVudC5zY3NzIn0= */";

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_pages_module_ts.js.map