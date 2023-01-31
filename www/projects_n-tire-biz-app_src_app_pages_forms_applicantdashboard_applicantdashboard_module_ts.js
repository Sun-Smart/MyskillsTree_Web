"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_applicantdashboard_applicantdashboard_module_ts"],{

/***/ 61611:
/*!********************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/applicantdashboard/applicantdashboard.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applicantdashboardComponent": () => (/* binding */ applicantdashboardComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_applicantdashboard_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./applicantdashboard.component.html */ 58587);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var _pages_forms_mstapplicantskilldetail_mstapplicantskilldetailgrid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetailgrid.component */ 60818);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);







let applicantdashboardComponent = class applicantdashboardComponent {
    constructor(dialog, currentRoute, sessionService) {
        this.dialog = dialog;
        this.currentRoute = currentRoute;
        this.sessionService = sessionService;
        this.isadmin = false;
        debugger;
        this.applicantid = this.sessionService.getItem("applicantid");
    }
    ngOnInit() {
        debugger;
        this.applicantid = this.currentRoute.snapshot.paramMap.get('id');
        if (this.sessionService.getItem("role") == '1') {
            this.isadmin = true;
        }
    }
    showSkills() {
        this.dialog.open(_pages_forms_mstapplicantskilldetail_mstapplicantskilldetailgrid_component__WEBPACK_IMPORTED_MODULE_2__.mstapplicantskilldetailgridComponent, {
            data: { ScreenType: 2, applicantid: this.applicantid, save: true }
        });
    }
};
applicantdashboardComponent.ctorParameters = () => [
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_3__.DialogService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
applicantdashboardComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-applicantdashboard',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_applicantdashboard_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
    })
], applicantdashboardComponent);



/***/ }),

/***/ 2419:
/*!*****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/applicantdashboard/applicantdashboard.module.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applicantdashboardModule": () => (/* binding */ applicantdashboardModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _applicantdashboard_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./applicantdashboard.routing */ 101);
/* harmony import */ var _applicantdashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./applicantdashboard.component */ 61611);
/* harmony import */ var _pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.module */ 50223);






//import { mstapplicantskilldetailgridComponent } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetailgrid.component';

let applicantdashboardModule = class applicantdashboardModule {
};
applicantdashboardModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _applicantdashboard_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule,
            _pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_module__WEBPACK_IMPORTED_MODULE_4__.mstapplicantskilldetailModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_applicantdashboard_component__WEBPACK_IMPORTED_MODULE_3__.applicantdashboardComponent],
        entryComponents: []
    })
], applicantdashboardModule);



/***/ }),

/***/ 101:
/*!******************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/applicantdashboard/applicantdashboard.routing.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _applicantdashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applicantdashboard.component */ 61611);


const routes = [
    {
        path: ':id', component: _applicantdashboard_component__WEBPACK_IMPORTED_MODULE_0__.applicantdashboardComponent
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(routes);


/***/ }),

/***/ 58587:
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/applicantdashboard/applicantdashboard.component.html ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<style type=\"text/css\">\r\n  /* #divChart {\r\n    display: block;\r\n    width: 400px;\r\n    height: 400px;\r\n  } */\r\n\r\n  .skill_btn {\r\n    width: 98%;\r\n    margin: 0px !important;\r\n    padding: 0px;\r\n    text-align: left !important;\r\n    border-radius: 0px !important;\r\n  }\r\n\r\n  .ref_btn {\r\n    background-color: #ed7d31;\r\n    color: #fff;\r\n    border-radius: 0px;\r\n  }\r\n\r\n  .res_ref_btn {\r\n    background-color: #a5a5a5;\r\n    color: #fff;\r\n    border-radius: 0px;\r\n  }\r\n\r\n  .pro_ref_btn {\r\n    background-color: #ECB50E;\r\n    color: #fff;\r\n    border-radius: 0px;\r\n  }\r\n\r\n  .edu_ref_btn {\r\n    background-color: #5B9BD5;\r\n    color: #fff;\r\n    border-radius: 0px;\r\n  }\r\n\r\n  .soc_ref_btn {\r\n    background-color: #65AE12;\r\n    color: #fff;\r\n    border-radius: 0px;\r\n  }\r\n\r\n  .per_ref_btn {\r\n    background-color: #ed7d31;\r\n    color: #fff;\r\n    border-radius: 0px;\r\n  }\r\n\r\n  .breadcrumb {\r\n    /* background: #ddd;\r\n    display: inline-block; */\r\n    /* padding: 1px;\r\n    padding-right: 18px; */\r\n    background-color: transparent !important;\r\n    /* background-color: red !important; */\r\n\r\n  }\r\n\r\n  .breadcrumb li {\r\n    display: inline-block;\r\n    /* background: white; */\r\n    padding: 0;\r\n    position: relative;\r\n    min-width: 50px;\r\n    height: fit-content;\r\n    text-decoration: none;\r\n    z-index: auto;\r\n    -webkit-clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 15px 50%);\r\n    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 15px 50%);\r\n    margin-right: -13px;\r\n  }\r\n\r\n  .breadcrumb li#last {\r\n    -webkit-clip-path: polygon(0 0, calc(100% - 0px) 0, 100% 50%, calc(100% - 0px) 100%, 0 100%, 15px 50%);\r\n    clip-path: polygon(0 0, calc(100% - 0px) 0, 100% 50%, calc(100% - 0px) 100%, 0 100%, 15px 50%);\r\n  }\r\n\r\n  .breadcrumb li:hover {\r\n    color: white;\r\n    background: #fff;\r\n  }\r\n\r\n  .breadcrumb li:first-child {\r\n    -webkit-clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);\r\n    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);\r\n  }\r\n\r\n  .tabbed {\r\n    overflow-x: hidden;\r\n    /* border-bottom: 1px solid #ccc; */\r\n  }\r\n\r\n  .tabbed [type=\"radio\"] {\r\n    display: none;\r\n  }\r\n\r\n  .tab {\r\n    margin-bottom: 1px !important;\r\n  }\r\n\r\n  .tabs {\r\n    display: flex;\r\n    align-items: stretch;\r\n    list-style: none;\r\n    padding: 0;\r\n    /* border-bottom: 1px solid #ccc; */\r\n  }\r\n\r\n  .tab>label {\r\n    display: block;\r\n    /* margin-bottom: -1px; */\r\n    padding: 12px 15px;\r\n    /* border: 1px solid #ccc; */\r\n    background: #eee;\r\n    color: #666;\r\n    font-size: 12px;\r\n    font-weight: 600;\r\n    text-transform: uppercase;\r\n    letter-spacing: 1px;\r\n    cursor: pointer;\r\n    /* transition: all 3s; */\r\n  }\r\n\r\n  .tab:hover label {\r\n    /* border-top-color: gray; */\r\n    color: #333;\r\n  }\r\n\r\n  .tab-content {\r\n    display: none;\r\n    color: #777;\r\n  }\r\n\r\n  .tabbed [type=\"radio\"]:nth-of-type(1):checked~.tabs .tab:nth-of-type(1) label,\r\n  .tabbed [type=\"radio\"]:nth-of-type(2):checked~.tabs .tab:nth-of-type(2) label,\r\n  .tabbed [type=\"radio\"]:nth-of-type(3):checked~.tabs .tab:nth-of-type(3) label,\r\n  .tabbed [type=\"radio\"]:nth-of-type(4):checked~.tabs .tab:nth-of-type(4) label,\r\n  .tabbed [type=\"radio\"]:nth-of-type(5):checked~.tabs .tab:nth-of-type(5) label,\r\n  .tabbed [type=\"radio\"]:nth-of-type(6):checked~.tabs .tab:nth-of-type(6) label {\r\n    /* border-bottom-color: #fff; */\r\n    /* border-top-color: gray; */\r\n    border-top: 5px solid green;\r\n    /* border-bottom: 5px solid green; */\r\n    /* line-height: 34px;\r\n    margin-bottom: 10px; */\r\n    /* border: 5px solid #000 !important; */\r\n    /* transform: scale(2); */\r\n    /* font-size: 10px; */\r\n    /* width: 140px; */\r\n    background: #fff;\r\n    color: #222;\r\n  }\r\n\r\n  .tabbed [type=\"radio\"]:nth-of-type(1):checked~.tab-content:nth-of-type(1),\r\n  .tabbed [type=\"radio\"]:nth-of-type(2):checked~.tab-content:nth-of-type(2),\r\n  .tabbed [type=\"radio\"]:nth-of-type(3):checked~.tab-content:nth-of-type(3),\r\n  .tabbed [type=\"radio\"]:nth-of-type(4):checked~.tab-content:nth-of-type(4),\r\n  .tabbed [type=\"radio\"]:nth-of-type(5):checked~.tab-content:nth-of-type(5),\r\n  .tabbed [type=\"radio\"]:nth-of-type(6):checked~.tab-content:nth-of-type(6) {\r\n    display: block;\r\n  }\r\n</style>\r\n<div id=\"contentArea1\" class=\"main container full-height\">\r\n  <br />\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col\">\r\n        <div class=\"card\" style=\"background-color: white !important;\r\n                height: 100% !important;\r\n                padding: 0px !important;\r\n                color: black !important;width: 100% !important;\">\r\n          <div class=\"card-header\" style=\"background-color: #148eeb;\r\n                color: white;border-radius: 8px 8px 0px 0px;\r\n                font-size: 15px;font-weight: bold;\">\r\n            User Profile\r\n          </div>\r\n          <div class=\"card-body\">\r\n            <div class=\"col-sm-12\">\r\n              <div class=\"row\">\r\n                <div class=\"col-8 col-sm-7\">\r\n                  <!--<div><canvas id=\"canvas\"></canvas></div>-->\r\n                  <ngx-dashboardviewer  [customdashboardid]=\"14\"></ngx-dashboardviewer>\r\n                </div>\r\n                <div class=\"col-4 col-sm-5\">\r\n                  <ul class=\"list-group col\">\r\n                    <li class=\"list-group-item dash_list\" style=\"color: gray;\r\n                          margin: 5px;\r\n                          padding: 1px;\r\n                          border: 1px solid gray;\r\n                          border-radius: 0px;\">\r\n                      <img src=\"assets/User Profile/Skillsets.png\" width=\"30px\" /> 1.SKILLSETS\r\n                      <img src=\"assets/User Profile/Complete.png\" width=\"30px\" style=\"float: right;\" />\r\n                    </li>\r\n                    <li class=\"list-group-item\" style=\"color: gray;\r\n                          margin: 5px;\r\n                          padding: 1px;\r\n                          border: 1px solid gray;\r\n                          border-radius: 0px;\">\r\n                      <img src=\"assets/User Profile/Sresum.png\" width=\"30px\" /> 2.RESUME\r\n                      <img src=\"assets/User Profile/Complete.png\" width=\"30px\" style=\"float: right;\" />\r\n                    </li>\r\n                    <li class=\"list-group-item\" style=\"color: gray;\r\n                          margin: 5px;\r\n                          padding: 1px;\r\n                          border: 1px solid gray;\r\n                          border-radius: 0px;\">\r\n                      <img src=\"assets/User Profile/Project.png\" width=\"30px\" /> 3.PROJECT\r\n                      <img src=\"assets/User Profile/Complete.png\" width=\"30px\" style=\"float: right;\" />\r\n                    </li>\r\n                    <li class=\"list-group-item\" style=\"color: gray;\r\n                          margin: 5px;\r\n                          padding: 1px;\r\n                          border: 1px solid gray;\r\n                          border-radius: 0px;\">\r\n                      <img src=\"assets/User Profile/education.png\" width=\"30px\" /> 4.EDUCATION\r\n                      <img src=\"assets/User Profile/Bending.png\" width=\"30px\" style=\"float: right;\" />\r\n                    </li>\r\n                    <li class=\"list-group-item\" style=\"color: gray;\r\n                          margin: 5px;\r\n                          padding: 1px;\r\n                          border: 1px solid gray;\r\n                          border-radius: 0px;\">\r\n                      <img src=\"assets/User Profile/Social Info.png\" width=\"30px\" /> 5. SOCIAL INFO\r\n                      <img src=\"assets/User Profile/Not Started.png\" width=\"30px\" style=\"float: right;\" />\r\n                    </li>\r\n                    <li class=\"list-group-item\" style=\"color: gray;\r\n                          margin: 5px;\r\n                          padding: 1px;\r\n                          border: 1px solid gray;\r\n                          border-radius: 0px;\">\r\n                      <img src=\"assets/User Profile/Personal.png\" width=\"30px\" /> 6. PERSONAL\r\n                      <img src=\"assets/User Profile/Not Started.png\" width=\"30px\" style=\"float: right;\" />\r\n                    </li>\r\n                  </ul>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col\">\r\n        <div class=\"card\" style=\"background-color: white !important;box-shadow: 0.5px;\r\n    height: 100% !important;\r\n    padding: 0px !important;\r\n    color: black !important;width: 100% !important;\">\r\n          <div class=\"card-header\" style=\"background-color: #148eeb;\r\n      color: white;\r\n      text-transform: uppercase;border-radius: 8px 8px 0px 0px;\r\n      font-size: 20px;\">\r\n            <button type=\"button\" class=\"btn btn-default\" style=\"background: white;\r\n        color: #148eeb;\r\n        font-size: 11px;\r\n        text-transform: uppercase;\r\n        font-weight: bold;\r\n        border-radius: 0px !important;position: relative;left: 74%;\">Show My Profile</button>\r\n          </div>\r\n          <div class=\"card-body\">\r\n            <div>\r\n              <div class=\"tabbed\">\r\n                <input type=\"radio\" id=\"tab1\" name=\"css-tabs\" checked>\r\n                <input type=\"radio\" id=\"tab2\" name=\"css-tabs\">\r\n                <input type=\"radio\" id=\"tab3\" name=\"css-tabs\">\r\n                <input type=\"radio\" id=\"tab4\" name=\"css-tabs\">\r\n                <input type=\"radio\" id=\"tab5\" name=\"css-tabs\">\r\n                <input type=\"radio\" id=\"tab6\" name=\"css-tabs\">\r\n                <ul class=\"tabs breadcrumb\">\r\n                  <li class=\"tab\"><label for=\"tab1\"\r\n                      style=\"background-color: #ed7d31;color: white;margin-top: 10px;\">SKILLSETS</label></li>\r\n                  <li class=\"tab\"><label for=\"tab2\"\r\n                      style=\"background-color: #a5a5a5;color: white;margin-top: 10px;\">RESUME</label></li>\r\n                  <li class=\"tab\"><label for=\"tab3\"\r\n                      style=\"background-color: #ECB50E;color: white;margin-top: 10px;\">PROJECT</label></li>\r\n                  <li class=\"tab\"><label for=\"tab4\"\r\n                      style=\"background-color: #5B9BD5;color: white;margin-top: 10px;\">EDUCATION</label></li>\r\n                  <li class=\"tab\"><label for=\"tab5\"\r\n                      style=\"background-color: #65AE12;color: white;margin-top: 10px;\">SOCIAL INFO</label></li>\r\n                  <li class=\"tab\"><label for=\"tab6\"\r\n                      style=\"background-color: #ED7D31;color: white;margin-top: 10px;\">PERSONAL</label></li>\r\n                </ul>\r\n                <div class=\"tab-content\">\r\n                  <button class=\"btn btn-outline-secondary skill_btn\" (click)=\"showSkills()\"><img src=\"assets/Skillsets/Skillsets.png\"\r\n                      width=\"40px;\" /> What is your skillsets?</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Skillsets/Located.png\"\r\n                      width=\"40px;\" /> Where are you located?</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Skillsets/Experience.png\"\r\n                      width=\"40px;\" /> What is your experience relevant to this skillset?</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary ref_btn\"> Reference</button>\r\n                </div>\r\n                <div class=\"tab-content\">\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Resume/About.png\"\r\n                      width=\"40px;\" /> Can you give you a Elevated Pitch about you in 100 words?</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Resume/Resume.png\"\r\n                      width=\"40px;\" /> Upload your Resume[PDF/Word]</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Resume/Links to Portals.png\"\r\n                      width=\"40px;\" /> Links to Portal where your resume already present</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary res_ref_btn\"> Reference</button>\r\n                </div>\r\n                <div class=\"tab-content\">\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Project/Experince.png\"\r\n                      width=\"40px;\" /> Can you tell your work experiences?</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Project/Key Project.png\"\r\n                      width=\"40px;\" /> Please provide details of Key Projects</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary pro_ref_btn\"> Reference</button>\r\n                </div>\r\n                <div class=\"tab-content\">\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Education/Education.png\"\r\n                      width=\"40px;\" /> Let us know details of your Education</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img\r\n                      src=\"assets/Education/Additional Certificates.png\" width=\"40px;\" /> Can you share any additional\r\n                    certificates</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary edu_ref_btn\"> Reference</button>\r\n                </div>\r\n                <div class=\"tab-content\">\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Social Info/Profile.png\"\r\n                      width=\"40px;\" /> Can you share social media profile?</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/Social Info/Group 286.png\"\r\n                      width=\"40px;\" /> Upload your project references,Images and videos</button>\r\n                </div>\r\n                <div class=\"tab-content\">\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/personal/About you.png\"\r\n                      width=\"40px;\" /> Please provide details about you</button><br /><br />\r\n                  <button class=\"btn btn-outline-secondary skill_btn\"><img src=\"assets/personal/Language.png\"\r\n                      width=\"40px;\" /> Share your language proficiencies</button><br /><br />\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_applicantdashboard_applicantdashboard_module_ts.js.map