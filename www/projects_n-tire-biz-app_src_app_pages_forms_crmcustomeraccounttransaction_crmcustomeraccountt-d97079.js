"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_crmcustomeraccounttransaction_crmcustomeraccountt-d97079"],{

/***/ 54861:
/*!***************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomeraccounttransaction/crmcustomeraccounttransaction.module.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomeraccounttransactionModule": () => (/* binding */ crmcustomeraccounttransactionModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _crmcustomeraccounttransaction_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crmcustomeraccounttransaction.routing */ 22851);
/* harmony import */ var _crmcustomeraccounttransaction_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crmcustomeraccounttransaction.component */ 61298);






let crmcustomeraccounttransactionModule = class crmcustomeraccounttransactionModule {
};
crmcustomeraccounttransactionModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _crmcustomeraccounttransaction_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_crmcustomeraccounttransaction_component__WEBPACK_IMPORTED_MODULE_3__.crmcustomeraccounttransactionComponent]
    })
], crmcustomeraccounttransactionModule);



/***/ }),

/***/ 22851:
/*!****************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomeraccounttransaction/crmcustomeraccounttransaction.routing.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _crmcustomeraccounttransaction_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crmcustomeraccounttransaction.component */ 61298);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'crmcustomeraccounttransactions', children: [
            { path: '', component: _crmcustomeraccounttransaction_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomeraccounttransactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _crmcustomeraccounttransaction_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomeraccounttransactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _crmcustomeraccounttransaction_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomeraccounttransactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _crmcustomeraccounttransaction_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomeraccounttransactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_crmcustomeraccounttransaction_crmcustomeraccountt-d97079.js.map