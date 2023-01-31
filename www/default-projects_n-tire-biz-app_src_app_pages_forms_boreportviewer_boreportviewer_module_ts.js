"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_boreportviewer_boreportviewer_module_ts"],{

/***/ 16651:
/*!**********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportviewer/boformviewer.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boformviewerComponent": () => (/* binding */ boformviewerComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boformviewer_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boformviewer.component.html */ 51815);
/* harmony import */ var _n_tire_biz_app_src_app_service_boreportviewer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/boreportviewer.service */ 56378);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);







let boformviewerComponent = class boformviewerComponent {
    constructor(router, boreportviewerservice, toastr, sharedService, 
    //private dialog: NbDialogService,
    currentRoute) {
        this.router = router;
        this.boreportviewerservice = boreportviewerservice;
        this.toastr = toastr;
        this.sharedService = sharedService;
        this.currentRoute = currentRoute;
        this.isSubmitted = false;
    }
    ngOnInit() {
        debugger;
        let boformviewer = null;
        if (this.data != null && this.data.data != null)
            this.data = this.data.data;
        if (this.data != null && this.data.reportid != null) {
            boformviewer = this.data.reportid;
        }
        else
            boformviewer = this.currentRoute.snapshot.paramMap.get('id');
        this.pk = this.currentRoute.snapshot.paramMap.get('pk');
        this.formid = boformviewer;
        this.sharedService.alert('4');
        this.boreportviewerservice.getBOReportResultsByID(boformviewer, null, null, null, null, status, null, null, this.pk).then((res) => {
            console.log(res);
            this.configdata = res.boreport;
            this.results = res.results;
            let rowData = this.results[0];
            console.log(rowData);
            console.log(this.configdata.viewhtml);
            this.viewhtml = this.configdata.viewhtml;
            console.log(this.viewhtml);
            let cols = res.boreportcolumn;
            ////debugger;
            cols.forEach((col) => {
                if (this.viewhtml != null && this.viewhtml != undefined)
                    this.viewhtml = this.viewhtml.replace(new RegExp('##' + col.field + '##', 'g'), rowData[col.field]);
            });
            console.log(this.viewhtml);
        });
    }
    route(action, recordid = null) {
        debugger;
        let formname = "";
        recordid = this.pk;
        this.sharedService.alert(recordid);
        if (action == "edit" && (recordid == null || recordid == "")) {
            this.sharedService.alert("Select a record to edit");
            return;
        }
        if (this.configdata.maintablename == "boreports") {
            formname = "boreports";
        }
        else {
            formname = this.configdata.component;
            if (formname == null || formname == "") {
                formname = this.configdata.maintablename.toLowerCase();
            }
        }
        let child = false;
        //if(this.menumasterdata!=null && this.menumasterdata!=undefined)child=this.menumasterdata.childparent;
        switch (action) {
            case 'create':
                this.router.navigate(['/home/' + formname + '/' + formname]);
                break;
            case 'view':
                this.router.navigate(['/home/boreportviewer/view/' + this.configdata.reportid + '/' + recordid]);
                break;
            case 'edit':
                this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + recordid]);
                break;
        }
    }
};
boformviewerComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router },
    { type: _n_tire_biz_app_src_app_service_boreportviewer_service__WEBPACK_IMPORTED_MODULE_1__.BOReportViewerService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute }
];
boformviewerComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-boformviewer',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boformviewer_component_html__WEBPACK_IMPORTED_MODULE_0__.default
    })
], boformviewerComponent);



/***/ }),

/***/ 26528:
/*!*********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportviewerModule": () => (/* binding */ boreportviewerModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _boreportviewer_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boreportviewer.routing */ 80263);
/* harmony import */ var _boformviewer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boformviewer.component */ 16651);
/* harmony import */ var _boreportdata_data_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../boreportdata/data.component */ 97469);
/* harmony import */ var _bodlgviewer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bodlgviewer.component */ 50729);







/*import { hrmsleaverequestModule } from '../hrmsleaverequest/hrmsleaverequest.module';
import { hrmsletterrequestModule } from '../hrmsletterrequest/hrmsletterrequest.module';
import { erppurchaserequestModule } from '../erppurchaserequest/erppurchaserequest.module';
import { umscourseModule } from '../umscourse/umscourse.module';*/
//import { bodashboardviewerModule } from '../../bodashboardviewer/bodashboardviewer.module';
let boreportviewerModule = class boreportviewerModule {
};
boreportviewerModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            //NgCommonModule,
            _boreportdata_data_component__WEBPACK_IMPORTED_MODULE_3__.dataComponent
        ],
        imports: [
            _boreportviewer_routing__WEBPACK_IMPORTED_MODULE_1__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
            //,bodashboardviewerModule
            //erppurchaserequestModule,
            //hrmsleaverequestModule,hrmsletterrequestModule,umscourseModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_boreportdata_data_component__WEBPACK_IMPORTED_MODULE_3__.dataComponent, _boformviewer_component__WEBPACK_IMPORTED_MODULE_2__.boformviewerComponent, _bodlgviewer_component__WEBPACK_IMPORTED_MODULE_4__.bodlgviewerComponent],
        entryComponents: [_boreportdata_data_component__WEBPACK_IMPORTED_MODULE_3__.dataComponent, _bodlgviewer_component__WEBPACK_IMPORTED_MODULE_4__.bodlgviewerComponent]
    })
], boreportviewerModule);



/***/ }),

/***/ 80263:
/*!**********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.routing.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _boreportviewer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boreportviewer.component */ 15731);
/* harmony import */ var _boformviewer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boformviewer.component */ 16651);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);




const routes = [
    { path: '', component: _boreportviewer_component__WEBPACK_IMPORTED_MODULE_0__.BOReportViewerComponent },
    { path: 'view/:id/:pk', component: _boformviewer_component__WEBPACK_IMPORTED_MODULE_1__.boformviewerComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
    { path: '/:id', component: _boreportviewer_component__WEBPACK_IMPORTED_MODULE_0__.BOReportViewerComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
    { path: '/:id', component: _boreportviewer_component__WEBPACK_IMPORTED_MODULE_0__.BOReportViewerComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
    { path: 'edit/:id', component: _boreportviewer_component__WEBPACK_IMPORTED_MODULE_0__.BOReportViewerComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes);


/***/ }),

/***/ 51815:
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boreportviewer/boformviewer.component.html ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<div class=\"row \" style='width: 100%;left: 0;position: absolute;scroll:auto'>\r\n\r\n    <div class=\"form-group row second nomargin\" style=\"width:100%!important\">\r\n\r\n        <div class=\"reportheader col-3  nomargin\">\r\n            {{reportheader}}\r\n        </div>\r\n        <div class=\"form-group col-3 nomargin\">\r\n            <i class=\"fa fa-search search\"></i><input type=\"text\" style='width:100%' class=\"form-control\"\r\n                placeholder=\"    Global Filter\"\r\n                (input)=\"treeview?dt1.filterGlobal($event.target.value, 'contains'):dt.filterGlobal($event.target.value, 'contains')\">\r\n        </div>\r\n        <div class=\"col-6\" style=\"text-align: right\" role=\"toolbar\" aria-label=\"Toolbar with button groups\">\r\n            <!--btn-toolbar-->\r\n            <div aria-label=\"third group\">\r\n                <button title=\"Add\" type=\"button\" class=\"third dialogbtn\" (click)=\"route('create')\"><i\r\n                        class=\"fa fa-plus-circle white\" aria-hidden=\"true\"></i></button>\r\n\r\n                <button title=\"Edit\" type=\"button\" class=\"third dialogbtn\" (click)=\"route( 'edit')\"><i\r\n                        class=\"fa fa-edit\" aria-hidden=\"true\"></i></button>\r\n                <button title=\"Show Checkbox\" *ngIf=\"checkboxavailable\" type=\"button\" class=\"third dialogbtn\"\r\n                    (click)=\"dt.reset();showCheckbox()\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></button>\r\n                <button title=\"Print\" type=\"button\" class=\"third dialogbtn\" (click)=\"print()\"><i class=\"fa fa-print\"\r\n                        aria-hidden=\"true\"></i></button>\r\n                <button title=\"Export\" type=\"button\" class=\"third dialogbtn\" (click)=\"export()\"><i\r\n                        class=\"fa fa-download\" aria-hidden=\"true\"></i></button>\r\n                <ng-container *ngFor=\"let action of menuactions\">\r\n                    <button type=\"button\" [title]=\"action.description\" class=\"third dialogbtn\"\r\n                        (click)=\"processaction(action)\"><i [ngClass]=\"action.actionicon\"\r\n                            aria-hidden=\"true\"></i></button>\r\n                </ng-container>\r\n                <!--                                  \r\n            <button  type=\"button\" class=\"third dialogbtn\" (click)=\"action()\"><i class=\"fa fa-external-link-alt\"\r\n                        aria-hidden=\"true\"></i></button>\r\n                        -->\r\n                <button type=\"button\"\r\n                    *ngIf=\"configdata!=null && configdata['alternateview']!=null  && configdata['alternateview']!=undefined && configdata['alternateview']!=''\"\r\n                    class=\"third dialogbtn\" (click)=\"List()\"><i class=\"fa fa-table\" aria-hidden=\"true\"></i></button>\r\n                <button title=\"AlternateView\" type=\"button\"\r\n                    *ngIf=\"configdata!=null && configdata['alternateview']!=null  && configdata['alternateview']!=undefined && configdata['alternateview']!=''\"\r\n                    class=\"third dialogbtn\" (click)=\"alternateview()\"><i class=\"fa fa-id-card\"\r\n                        aria-hidden=\"true\"></i></button>\r\n                <!-- <button  type=\"button\" class=\"third dialogbtn\" (click)=\"deleteAll()\"><i class=\"fa fa-trash\"\r\n                    aria-hidden=\"true\"></i></button>-->\r\n                <button title=\"Show All\" type=\"button\" class=\"third dialogbtn\" (click)=\"showAll()\"><i class=\"fa fa-ban\"\r\n                        aria-hidden=\"true\"></i></button>\r\n\r\n                <button title=\"Filter\" type=\"button\" class=\"third dialogbtn\" (click)=\"showFilter()\"><i\r\n                        class=\"fa fa-filter\" aria-hidden=\"true\"></i></button>\r\n                <button type=\"button\" class=\"third dialogbtn\" (click)=\"email()\"><i class=\"fa fa-envelope\"\r\n                        aria-hidden=\"true\"></i></button>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n\r\n    <table>\r\n        <tr>\r\n            <td class=\"autogrow\" innerHTML=\"{{viewhtml}}\"></td>\r\n        </tr>\r\n    </table>\r\n\r\n</div>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_boreportviewer_boreportviewer_module_ts.js.map