"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_mstapplicantreferenceaccepted_mstapplicantreferenceacce-f40a1a"],{

/***/ 14221:
/*!*********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/mstapplicantreferenceaccepted/mstapplicantreferenceaccepted.module.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantreferencerequestModule": () => (/* binding */ mstapplicantreferencerequestModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantreferenceaccepted_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantreferenceaccepted.routing */ 67655);
/* harmony import */ var _mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantreferenceaccepted.component */ 171);






// import { mstapplicantreferencegridComponent } from './mstapplicantreferencegrid.component';
let mstapplicantreferencerequestModule = class mstapplicantreferencerequestModule {
};
mstapplicantreferencerequestModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantreferenceaccepted_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_3__.MstapplicantreferenceacceptedComponent]
    })
], mstapplicantreferencerequestModule);



/***/ }),

/***/ 67655:
/*!**********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/mstapplicantreferenceaccepted/mstapplicantreferenceaccepted.routing.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantreferenceaccepted.component */ 171);


const routes = [
    {
        path: 'mstapplicantreferencerequestsaccepted', children: [
            { path: '', component: _mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_0__.MstapplicantreferenceacceptedComponent },
            { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_0__.MstapplicantreferenceacceptedComponent },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_0__.MstapplicantreferenceacceptedComponent },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_0__.MstapplicantreferenceacceptedComponent },
            { path: 'edit/:id', component: _mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_0__.MstapplicantreferenceacceptedComponent },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantreferenceaccepted_component__WEBPACK_IMPORTED_MODULE_0__.MstapplicantreferenceacceptedComponent }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(routes);


/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_mstapplicantreferenceaccepted_mstapplicantreferenceacce-f40a1a.js.map