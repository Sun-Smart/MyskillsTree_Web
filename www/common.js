"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["common"],{

/***/ 68289:
/*!*****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomenuaction/bomenuaction.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomenuactionModule": () => (/* binding */ bomenuactionModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _bomenuaction_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bomenuaction.routing */ 30209);
/* harmony import */ var _bomenuaction_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bomenuaction.component */ 21189);






let bomenuactionModule = class bomenuactionModule {
};
bomenuactionModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _bomenuaction_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bomenuaction_component__WEBPACK_IMPORTED_MODULE_3__.bomenuactionComponent]
    })
], bomenuactionModule);



/***/ }),

/***/ 30209:
/*!******************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomenuaction/bomenuaction.routing.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bomenuaction_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bomenuaction.component */ 21189);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'bomenuactions', children: [
            { path: '', component: _bomenuaction_component__WEBPACK_IMPORTED_MODULE_0__.bomenuactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _bomenuaction_component__WEBPACK_IMPORTED_MODULE_0__.bomenuactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _bomenuaction_component__WEBPACK_IMPORTED_MODULE_0__.bomenuactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _bomenuaction_component__WEBPACK_IMPORTED_MODULE_0__.bomenuactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 68834:
/*!***************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantachievementdetail/mstapplicantachievementdetail.module.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantachievementdetailModule": () => (/* binding */ mstapplicantachievementdetailModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantachievementdetail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantachievementdetail.routing */ 94629);
/* harmony import */ var _mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantachievementdetail.component */ 42850);
/* harmony import */ var _mstapplicantachivementgrid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mstapplicantachivementgrid.component */ 92794);







let mstapplicantachievementdetailModule = class mstapplicantachievementdetailModule {
};
mstapplicantachievementdetailModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantachievementdetail_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantachievementdetailComponent, _mstapplicantachivementgrid_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantachivementgridComponent]
    })
], mstapplicantachievementdetailModule);



/***/ }),

/***/ 94629:
/*!****************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantachievementdetail/mstapplicantachievementdetail.routing.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantachievementdetail.component */ 42850);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicantachievementdetails', children: [
            { path: '', component: _mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantachievementdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantachievementdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantachievementdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantachievementdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantachievementdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 35563:
/*!*****************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantcareerdetail/mstapplicantcareerdetail.module.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantcareerdetailModule": () => (/* binding */ mstapplicantcareerdetailModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantcareerdetail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantcareerdetail.routing */ 66347);
/* harmony import */ var _mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantcareerdetail.component */ 6403);
/* harmony import */ var primeng_autocomplete__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/autocomplete */ 67716);
/* harmony import */ var _mstapplicantcareergrid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mstapplicantcareergrid.component */ 5350);








let mstapplicantcareerdetailModule = class mstapplicantcareerdetailModule {
};
mstapplicantcareerdetailModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantcareerdetail_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule,
            primeng_autocomplete__WEBPACK_IMPORTED_MODULE_7__.AutoCompleteModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantcareerdetailComponent, _mstapplicantcareergrid_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantcareergridComponent]
    })
], mstapplicantcareerdetailModule);



/***/ }),

/***/ 66347:
/*!******************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantcareerdetail/mstapplicantcareerdetail.routing.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantcareerdetail.component */ 6403);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicantcareerdetails', children: [
            { path: '', component: _mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantcareerdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantcareerdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantcareerdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantcareerdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantcareerdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 59330:
/*!***********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicanteducationdetail/mstapplicanteducationdetail.module.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicanteducationdetailModule": () => (/* binding */ mstapplicanteducationdetailModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicanteducationdetail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicanteducationdetail.routing */ 45557);
/* harmony import */ var _mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicanteducationdetail.component */ 41294);
/* harmony import */ var _mstapplicanteducationgrid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mstapplicanteducationgrid.component */ 72399);







let mstapplicanteducationdetailModule = class mstapplicanteducationdetailModule {
};
mstapplicanteducationdetailModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicanteducationdetail_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicanteducationdetailComponent, _mstapplicanteducationgrid_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicanteducationdetailgridComponent]
    })
], mstapplicanteducationdetailModule);



/***/ }),

/***/ 45557:
/*!************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicanteducationdetail/mstapplicanteducationdetail.routing.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicanteducationdetail.component */ 41294);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicanteducationdetails', children: [
            { path: '', component: _mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicanteducationdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicanteducationdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicanteducationdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicanteducationdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicanteducationdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 58055:
/*!*******************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantgeographypreference/mstapplicantgeographypreference.module.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantgeographypreferenceModule": () => (/* binding */ mstapplicantgeographypreferenceModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantgeographypreference_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantgeographypreference.routing */ 18209);
/* harmony import */ var _mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantgeographypreference.component */ 74616);
/* harmony import */ var _mstapplicantgeographygrid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mstapplicantgeographygrid.component */ 9342);







let mstapplicantgeographypreferenceModule = class mstapplicantgeographypreferenceModule {
};
mstapplicantgeographypreferenceModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantgeographypreference_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantgeographypreferenceComponent, _mstapplicantgeographygrid_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantgeographygrid]
    })
], mstapplicantgeographypreferenceModule);



/***/ }),

/***/ 18209:
/*!********************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantgeographypreference/mstapplicantgeographypreference.routing.ts ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantgeographypreference.component */ 74616);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicantgeographypreferences', children: [
            { path: '', component: _mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantgeographypreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantgeographypreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantgeographypreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantgeographypreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantgeographypreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 58707:
/*!*********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantlanguagedetail/mstapplicantlanguagedetail.module.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantlanguagedetailModule": () => (/* binding */ mstapplicantlanguagedetailModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantlanguagedetail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantlanguagedetail.routing */ 4910);
/* harmony import */ var _mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantlanguagedetail.component */ 22115);
/* harmony import */ var _mstapplicantlanguagegrid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mstapplicantlanguagegrid.component */ 60617);







let mstapplicantlanguagedetailModule = class mstapplicantlanguagedetailModule {
};
mstapplicantlanguagedetailModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantlanguagedetail_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantlanguagedetailComponent, _mstapplicantlanguagegrid_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantlanuagegridComponent]
    })
], mstapplicantlanguagedetailModule);



/***/ }),

/***/ 4910:
/*!**********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantlanguagedetail/mstapplicantlanguagedetail.routing.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantlanguagedetail.component */ 22115);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicantlanguagedetails', children: [
            { path: '', component: _mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantlanguagedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantlanguagedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantlanguagedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantlanguagedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantlanguagedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 3868:
/*!*************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.module.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantreferencerequestModule": () => (/* binding */ mstapplicantreferencerequestModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantreferencerequest_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantreferencerequest.routing */ 57895);
/* harmony import */ var _mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantreferencerequest.component */ 49342);
/* harmony import */ var _mstapplicantreferencegrid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mstapplicantreferencegrid.component */ 85808);







let mstapplicantreferencerequestModule = class mstapplicantreferencerequestModule {
};
mstapplicantreferencerequestModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantreferencerequest_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantreferencerequestComponent, _mstapplicantreferencegrid_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantreferencegridComponent]
    })
], mstapplicantreferencerequestModule);



/***/ }),

/***/ 57895:
/*!**************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.routing.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantreferencerequest.component */ 49342);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicantreferencerequests', children: [
            { path: '', component: _mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencerequestComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencerequestComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencerequestComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencerequestComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencerequestComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantreferencerequestComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 84531:
/*!***************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.module.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantsocialmediadetailModule": () => (/* binding */ mstapplicantsocialmediadetailModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantsocialmediadetail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantsocialmediadetail.routing */ 95738);
/* harmony import */ var _mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantsocialmediadetail.component */ 95343);
/* harmony import */ var _mstapplicantsocialmediagrid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mstapplicantsocialmediagrid.component */ 54378);







let mstapplicantsocialmediadetailModule = class mstapplicantsocialmediadetailModule {
};
mstapplicantsocialmediadetailModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantsocialmediadetail_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantsocialmediadetailComponent, _mstapplicantsocialmediagrid_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantsocialmediagridComponent]
    })
], mstapplicantsocialmediadetailModule);



/***/ }),

/***/ 95738:
/*!****************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.routing.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantsocialmediadetail.component */ 95343);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicantsocialmediadetails', children: [
            { path: '', component: _mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantsocialmediadetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantsocialmediadetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantsocialmediadetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantsocialmediadetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantsocialmediadetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 38404:
/*!*******************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantworkreference/mstapplicantworkreference.module.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantworkreferenceModule": () => (/* binding */ mstapplicantworkreferenceModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantworkreference_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantworkreference.routing */ 11251);
/* harmony import */ var _mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantworkreference.component */ 68225);
/* harmony import */ var _mstapplicantworkrefgrid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mstapplicantworkrefgrid.component */ 26633);







let mstapplicantworkreferenceModule = class mstapplicantworkreferenceModule {
};
mstapplicantworkreferenceModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantworkreference_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantworkreferenceComponent, _mstapplicantworkrefgrid_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantworkrefgridComponent]
    })
], mstapplicantworkreferenceModule);



/***/ }),

/***/ 11251:
/*!********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantworkreference/mstapplicantworkreference.routing.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantworkreference.component */ 68225);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicantworkreferences', children: [
            { path: '', component: _mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantworkreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantworkreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantworkreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantworkreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantworkreferenceComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 56282:
/*!*****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstjobstatus/mstjobstatus.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstjobstatusModule": () => (/* binding */ mstjobstatusModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstjobstatus_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstjobstatus.routing */ 82482);
/* harmony import */ var _mstjobstatus_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstjobstatus.component */ 83793);






let mstjobstatusModule = class mstjobstatusModule {
};
mstjobstatusModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstjobstatus_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_3__.mstjobstatusComponent]
    })
], mstjobstatusModule);



/***/ }),

/***/ 82482:
/*!******************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstjobstatus/mstjobstatus.routing.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstjobstatus_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstjobstatus.component */ 83793);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstjobstatuses', children: [
            { path: '', component: _mstjobstatus_component__WEBPACK_IMPORTED_MODULE_0__.mstjobstatusComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstjobstatus_component__WEBPACK_IMPORTED_MODULE_0__.mstjobstatusComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _mstjobstatus_component__WEBPACK_IMPORTED_MODULE_0__.mstjobstatusComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstjobstatus_component__WEBPACK_IMPORTED_MODULE_0__.mstjobstatusComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 42969:
/*!******************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bousergroupaccess.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bousergroupaccessService": () => (/* binding */ bousergroupaccessService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let bousergroupaccessService = class bousergroupaccessService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bousergroupaccesses(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroupaccess', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroupaccess' + '/getdefaultdata').toPromise();
        }
    }
    get_bousergroupaccesses_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroupaccess').toPromise();
        }
    }
    getListBy_accessid(accessid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroupaccess' + '/accessid/' + accessid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroupaccess' + '/param/' + key).toPromise();
        }
    }
    get_bousergroupaccesses_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroupaccess' + '/e/' + id).toPromise();
        }
    }
    get_bousergroupaccesses_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroupaccess' + '/' + id).toPromise();
        }
    }
    delete_bousergroupaccess(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bousergroupaccess' + '/' + id).toPromise();
        }
    }
    getList_usergroupid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bousergroupaccess' + '/getList_usergroupid').toPromise();
    }
};
bousergroupaccessService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bousergroupaccessService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], bousergroupaccessService);



/***/ })

}]);
//# sourceMappingURL=common.js.map