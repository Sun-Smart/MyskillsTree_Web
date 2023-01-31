"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_mstjobrequirement_mstjobrequirement_module_ts"],{

/***/ 70700:
/*!***************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.module.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstjobrequirementModule": () => (/* binding */ mstjobrequirementModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstjobrequirement_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstjobrequirement.routing */ 60429);
/* harmony import */ var _mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstjobrequirement.component */ 99457);
/* harmony import */ var primeng_autocomplete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/autocomplete */ 67716);







let mstjobrequirementModule = class mstjobrequirementModule {
};
mstjobrequirementModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstjobrequirement_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule,
            primeng_autocomplete__WEBPACK_IMPORTED_MODULE_6__.AutoCompleteModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_3__.mstjobrequirementComponent]
    })
], mstjobrequirementModule);



/***/ }),

/***/ 60429:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.routing.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstjobrequirement.component */ 99457);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstjobrequirements', children: [
            { path: '', component: _mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_0__.mstjobrequirementComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_0__.mstjobrequirementComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_0__.mstjobrequirementComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_0__.mstjobrequirementComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_mstjobrequirement_mstjobrequirement_module_ts.js.map