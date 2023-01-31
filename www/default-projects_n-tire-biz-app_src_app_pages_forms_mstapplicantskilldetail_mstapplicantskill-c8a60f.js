"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_mstapplicantskilldetail_mstapplicantskill-c8a60f"],{

/***/ 26526:
/*!***************************************************************************!*\
  !*** ./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-inputswitch.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INPUTSWITCH_VALUE_ACCESSOR": () => (/* binding */ INPUTSWITCH_VALUE_ACCESSOR),
/* harmony export */   "InputSwitch": () => (/* binding */ InputSwitch),
/* harmony export */   "InputSwitchModule": () => (/* binding */ InputSwitchModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 1707);







const _c0 = function (a1, a2, a3) { return { "p-inputswitch p-component": true, "p-inputswitch-checked": a1, "p-disabled": a2, "p-focus": a3 }; };
const INPUTSWITCH_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.NG_VALUE_ACCESSOR,
    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(() => InputSwitch),
    multi: true
};
class InputSwitch {
    constructor(cd) {
        this.cd = cd;
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.checked = false;
        this.focused = false;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    onClick(event, cb) {
        if (!this.disabled && !this.readonly) {
            event.preventDefault();
            this.toggle(event);
            cb.focus();
        }
    }
    onInputChange(event) {
        if (!this.readonly) {
            const inputChecked = event.target.checked;
            this.updateModel(event, inputChecked);
        }
    }
    toggle(event) {
        this.updateModel(event, !this.checked);
    }
    updateModel(event, value) {
        this.checked = value;
        this.onModelChange(this.checked);
        this.onChange.emit({
            originalEvent: event,
            checked: this.checked
        });
    }
    onFocus(event) {
        this.focused = true;
    }
    onBlur(event) {
        this.focused = false;
        this.onModelTouched();
    }
    writeValue(checked) {
        this.checked = checked;
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
}
InputSwitch.ɵfac = function InputSwitch_Factory(t) { return new (t || InputSwitch)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef)); };
InputSwitch.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: InputSwitch, selectors: [["p-inputSwitch"]], inputs: { disabled: "disabled", style: "style", styleClass: "styleClass", tabindex: "tabindex", inputId: "inputId", name: "name", readonly: "readonly", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onChange: "onChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([INPUTSWITCH_VALUE_ACCESSOR])], decls: 5, vars: 15, consts: [[3, "ngClass", "ngStyle", "click"], [1, "p-hidden-accessible"], ["type", "checkbox", "role", "switch", 3, "checked", "disabled", "change", "focus", "blur"], ["cb", ""], [1, "p-inputswitch-slider"]], template: function InputSwitch_Template(rf, ctx) { if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InputSwitch_Template_div_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3); return ctx.onClick($event, _r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "input", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function InputSwitch_Template_input_change_2_listener($event) { return ctx.onInputChange($event); })("focus", function InputSwitch_Template_input_focus_2_listener($event) { return ctx.onFocus($event); })("blur", function InputSwitch_Template_input_blur_2_listener($event) { return ctx.onBlur($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx.styleClass);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](11, _c0, ctx.checked, ctx.disabled, ctx.focused))("ngStyle", ctx.style);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", ctx.checked)("disabled", ctx.disabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("id", ctx.inputId)("name", ctx.name)("tabindex", ctx.tabindex)("aria-checked", ctx.checked)("aria-labelledby", ctx.ariaLabelledBy);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgStyle], styles: [".p-inputswitch{-ms-user-select:none;-webkit-user-select:none;display:inline-block;position:relative;user-select:none}.p-inputswitch-slider{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.p-inputswitch-slider:before{content:\"\";position:absolute;top:50%}"], encapsulation: 2, changeDetection: 0 });
InputSwitch.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef }
];
InputSwitch.propDecorators = {
    style: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input }],
    styleClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input }],
    tabindex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input }],
    inputId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input }],
    name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input }],
    disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input }],
    readonly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input }],
    ariaLabelledBy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input }],
    onChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](InputSwitch, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
        args: [{
                selector: 'p-inputSwitch',
                template: `
        <div [ngClass]="{'p-inputswitch p-component': true, 'p-inputswitch-checked': checked, 'p-disabled': disabled, 'p-focus': focused}" 
            [ngStyle]="style" [class]="styleClass" (click)="onClick($event, cb)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [attr.id]="inputId" [attr.name]="name" [attr.tabindex]="tabindex" [checked]="checked" (change)="onInputChange($event)"
                    (focus)="onFocus($event)" (blur)="onBlur($event)" [disabled]="disabled" role="switch" [attr.aria-checked]="checked" [attr.aria-labelledby]="ariaLabelledBy"/>
            </div>
            <span class="p-inputswitch-slider"></span>
        </div>
    `,
                providers: [INPUTSWITCH_VALUE_ACCESSOR],
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectionStrategy.OnPush,
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewEncapsulation.None,
                styles: [".p-inputswitch{-ms-user-select:none;-webkit-user-select:none;display:inline-block;position:relative;user-select:none}.p-inputswitch-slider{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.p-inputswitch-slider:before{content:\"\";position:absolute;top:50%}"]
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef }]; }, { onChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
        }], disabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
        }], style: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
        }], styleClass: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
        }], tabindex: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
        }], inputId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
        }], name: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
        }], readonly: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
        }], ariaLabelledBy: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
        }] }); })();
class InputSwitchModule {
}
InputSwitchModule.ɵfac = function InputSwitchModule_Factory(t) { return new (t || InputSwitchModule)(); };
InputSwitchModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: InputSwitchModule });
InputSwitchModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](InputSwitchModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
        args: [{
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
                exports: [InputSwitch],
                declarations: [InputSwitch]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](InputSwitchModule, { declarations: function () { return [InputSwitch]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]; }, exports: function () { return [InputSwitch]; } }); })();

/**
 * Generated bundle index. Do not edit.
 */





/***/ }),

/***/ 50223:
/*!***************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.module.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantskilldetailModule": () => (/* binding */ mstapplicantskilldetailModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantskilldetail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantskilldetail.routing */ 1587);
/* harmony import */ var _mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantskilldetail.component */ 33474);
/* harmony import */ var _bomasterdata_bomasterdata_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bomasterdata/bomasterdata.module */ 80459);
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/inputswitch */ 26526);
/* harmony import */ var _mstapplicantskilldetailgrid_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mstapplicantskilldetailgrid.component */ 60818);
/* harmony import */ var _mstsegment_mstsegment_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../mstsegment/mstsegment.module */ 76528);
/* harmony import */ var _mstcategory_mstcategory_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../mstcategory/mstcategory.module */ 68183);
/* harmony import */ var _mstsubcategory_mstsubcategory_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../mstsubcategory/mstsubcategory.module */ 9239);












let mstapplicantskilldetailModule = class mstapplicantskilldetailModule {
};
mstapplicantskilldetailModule = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantskilldetail_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _bomasterdata_bomasterdata_module__WEBPACK_IMPORTED_MODULE_4__.bomasterdataModule, primeng_inputswitch__WEBPACK_IMPORTED_MODULE_11__.InputSwitchModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_10__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantskilldetailComponent, _mstapplicantskilldetailgrid_component__WEBPACK_IMPORTED_MODULE_5__.mstapplicantskilldetailgridComponent, _mstsegment_mstsegment_module__WEBPACK_IMPORTED_MODULE_6__.mstsegmentModule, _mstcategory_mstcategory_module__WEBPACK_IMPORTED_MODULE_7__.mstcategoryModule, _mstsubcategory_mstsubcategory_module__WEBPACK_IMPORTED_MODULE_8__.mstsubcategoryModule],
        entryComponents: [_mstapplicantskilldetailgrid_component__WEBPACK_IMPORTED_MODULE_5__.mstapplicantskilldetailgridComponent]
    })
], mstapplicantskilldetailModule);



/***/ }),

/***/ 1587:
/*!****************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.routing.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantskilldetail.component */ 33474);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstapplicantskilldetails', children: [
            { path: '', component: _mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantskilldetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantskilldetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantskilldetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantskilldetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantskilldetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

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
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_mstapplicantskilldetail_mstapplicantskill-c8a60f.js.map