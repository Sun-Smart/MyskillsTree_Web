"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_mstsegment_mstsegment_module_ts"],{

/***/ 68183:
/*!***************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstcategory/mstcategory.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstcategoryModule": () => (/* binding */ mstcategoryModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstcategory_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstcategory.routing */ 52729);
/* harmony import */ var _mstcategory_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstcategory.component */ 48026);






let mstcategoryModule = class mstcategoryModule {
};
mstcategoryModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstcategory_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstcategory_component__WEBPACK_IMPORTED_MODULE_3__.mstcategoryComponent]
    })
], mstcategoryModule);



/***/ }),

/***/ 52729:
/*!****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstcategory/mstcategory.routing.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstcategory_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstcategory.component */ 48026);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstcategories', children: [
            { path: '', component: _mstcategory_component__WEBPACK_IMPORTED_MODULE_0__.mstcategoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstcategory_component__WEBPACK_IMPORTED_MODULE_0__.mstcategoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _mstcategory_component__WEBPACK_IMPORTED_MODULE_0__.mstcategoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourceKey/:sourceid', component: _mstcategory_component__WEBPACK_IMPORTED_MODULE_0__.mstcategoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 76528:
/*!*************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstsegment/mstsegment.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstsegmentModule": () => (/* binding */ mstsegmentModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstsegment_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstsegment.routing */ 66610);
/* harmony import */ var _mstsegment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstsegment.component */ 28244);
/* harmony import */ var _mstcategory_mstcategory_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mstcategory/mstcategory.module */ 68183);
/* harmony import */ var _mstsubcategory_mstsubcategory_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mstsubcategory/mstsubcategory.module */ 9239);








let mstsegmentModule = class mstsegmentModule {
};
mstsegmentModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstsegment_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _mstcategory_mstcategory_module__WEBPACK_IMPORTED_MODULE_4__.mstcategoryModule, _mstsubcategory_mstsubcategory_module__WEBPACK_IMPORTED_MODULE_5__.mstsubcategoryModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_7__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstsegment_component__WEBPACK_IMPORTED_MODULE_3__.mstsegmentComponent]
    })
], mstsegmentModule);



/***/ }),

/***/ 66610:
/*!**************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstsegment/mstsegment.routing.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstsegment_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstsegment.component */ 28244);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstsegments', children: [
            { path: '', component: _mstsegment_component__WEBPACK_IMPORTED_MODULE_0__.mstsegmentComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstsegment_component__WEBPACK_IMPORTED_MODULE_0__.mstsegmentComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _mstsegment_component__WEBPACK_IMPORTED_MODULE_0__.mstsegmentComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourceKey/:sourceid', component: _mstsegment_component__WEBPACK_IMPORTED_MODULE_0__.mstsegmentComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 9239:
/*!*********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstsubcategory/mstsubcategory.module.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstsubcategoryModule": () => (/* binding */ mstsubcategoryModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstsubcategory_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstsubcategory.routing */ 32613);
/* harmony import */ var _mstsubcategory_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstsubcategory.component */ 16195);






let mstsubcategoryModule = class mstsubcategoryModule {
};
mstsubcategoryModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstsubcategory_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstsubcategory_component__WEBPACK_IMPORTED_MODULE_3__.mstsubcategoryComponent]
    })
], mstsubcategoryModule);



/***/ }),

/***/ 32613:
/*!**********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstsubcategory/mstsubcategory.routing.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstsubcategory_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstsubcategory.component */ 16195);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstsubcategories', children: [
            { path: '', component: _mstsubcategory_component__WEBPACK_IMPORTED_MODULE_0__.mstsubcategoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstsubcategory_component__WEBPACK_IMPORTED_MODULE_0__.mstsubcategoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _mstsubcategory_component__WEBPACK_IMPORTED_MODULE_0__.mstsubcategoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourceKey/:sourceid', component: _mstsubcategory_component__WEBPACK_IMPORTED_MODULE_0__.mstsubcategoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_mstsegment_mstsegment_module_ts.js.map