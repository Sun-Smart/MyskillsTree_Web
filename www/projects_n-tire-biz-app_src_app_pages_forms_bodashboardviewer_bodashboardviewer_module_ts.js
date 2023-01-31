"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_bodashboardviewer_bodashboardviewer_module_ts"],{

/***/ 54059:
/*!***************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bodashboardviewer/bodashboardviewer.module.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bodashboardviewerModule": () => (/* binding */ bodashboardviewerModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _bodashboardviewer_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bodashboardviewer.routing */ 84556);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng2-charts */ 41803);
/* harmony import */ var _pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.module */ 50223);
/* harmony import */ var _bodashboardviewer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bodashboardviewer.component */ 12738);
/* harmony import */ var _mstapplicantgeographypreference_mstapplicantgeographypreference_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mstapplicantgeographypreference/mstapplicantgeographypreference.module */ 58055);
/* harmony import */ var _mstapplicantworkreference_mstapplicantworkreference_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mstapplicantworkreference/mstapplicantworkreference.module */ 38404);
/* harmony import */ var _mstapplicantcareerdetail_mstapplicantcareerdetail_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../mstapplicantcareerdetail/mstapplicantcareerdetail.module */ 35563);
/* harmony import */ var _mstapplicanteducationdetail_mstapplicanteducationdetail_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../mstapplicanteducationdetail/mstapplicanteducationdetail.module */ 59330);
/* harmony import */ var _mstapplicantsocialmediadetail_mstapplicantsocialmediadetail_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.module */ 84531);
/* harmony import */ var _mstapplicantlanguagedetail_mstapplicantlanguagedetail_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../mstapplicantlanguagedetail/mstapplicantlanguagedetail.module */ 58707);
/* harmony import */ var _mstapplicantreferencerequest_mstapplicantreferencerequest_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../mstapplicantreferencerequest/mstapplicantreferencerequest.module */ 3868);
/* harmony import */ var _mstapplicantachievementdetail_mstapplicantachievementdetail_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../mstapplicantachievementdetail/mstapplicantachievementdetail.module */ 68834);
/* harmony import */ var _mstapplicantmaster_mstapplicantmastermain_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../mstapplicantmaster/mstapplicantmastermain.component */ 47706);
/* harmony import */ var _mstapplicantmaster_mstresumeapplicant_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../mstapplicantmaster/mstresumeapplicant.component */ 80497);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/calendar */ 59668);


// import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module'
















let bodashboardviewerModule = class bodashboardviewerModule {
};
bodashboardviewerModule = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [
            _bodashboardviewer_routing__WEBPACK_IMPORTED_MODULE_1__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule,
            ng2_charts__WEBPACK_IMPORTED_MODULE_16__.ChartsModule,
            _pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_module__WEBPACK_IMPORTED_MODULE_2__.mstapplicantskilldetailModule,
            _mstapplicantgeographypreference_mstapplicantgeographypreference_module__WEBPACK_IMPORTED_MODULE_4__.mstapplicantgeographypreferenceModule,
            _mstapplicantworkreference_mstapplicantworkreference_module__WEBPACK_IMPORTED_MODULE_5__.mstapplicantworkreferenceModule,
            _mstapplicantcareerdetail_mstapplicantcareerdetail_module__WEBPACK_IMPORTED_MODULE_6__.mstapplicantcareerdetailModule,
            _mstapplicanteducationdetail_mstapplicanteducationdetail_module__WEBPACK_IMPORTED_MODULE_7__.mstapplicanteducationdetailModule,
            _mstapplicantsocialmediadetail_mstapplicantsocialmediadetail_module__WEBPACK_IMPORTED_MODULE_8__.mstapplicantsocialmediadetailModule,
            _mstapplicantlanguagedetail_mstapplicantlanguagedetail_module__WEBPACK_IMPORTED_MODULE_9__.mstapplicantlanguagedetailModule,
            _mstapplicantreferencerequest_mstapplicantreferencerequest_module__WEBPACK_IMPORTED_MODULE_10__.mstapplicantreferencerequestModule,
            _mstapplicantachievementdetail_mstapplicantachievementdetail_module__WEBPACK_IMPORTED_MODULE_11__.mstapplicantachievementdetailModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_17__.CalendarModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_15__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bodashboardviewer_component__WEBPACK_IMPORTED_MODULE_3__.BODashboardViewerComponent, _mstapplicantmaster_mstapplicantmastermain_component__WEBPACK_IMPORTED_MODULE_12__.mstapplicantmastermainComponent, _mstapplicantmaster_mstresumeapplicant_component__WEBPACK_IMPORTED_MODULE_13__.mstresumeapplicantComponent]
    })
], bodashboardviewerModule);



/***/ }),

/***/ 84556:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bodashboardviewer/bodashboardviewer.routing.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bodashboardviewer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bodashboardviewer.component */ 12738);


const routes = [
    {
        path: ':id', component: _bodashboardviewer_component__WEBPACK_IMPORTED_MODULE_0__.BODashboardViewerComponent
        // path: 'bodashboardviewer', children: [
        //   { path: '', component: BODashboardViewerComponent },
        //   { path: ':id', component: BODashboardViewerComponent },
        //   { path: 'edit/:id', component: BODashboardViewerComponent },
        //   { path: 'view/:viewid', component: BODashboardViewerComponent }
        // ]
    },
    // {
    //   path: '', children: [
    //     { path: '', component: BODashboardViewerComponent },
    //     { path: ':id', component: BODashboardViewerComponent },
    //     { path: 'edit/:id', component: BODashboardViewerComponent },
    //     { path: 'view/:viewid', component: BODashboardViewerComponent }
    //   ]
    // }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(routes);


/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_bodashboardviewer_bodashboardviewer_module_ts.js.map