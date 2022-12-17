import { NgCommonModule } from '../../../n-tire-bo-app/src/app/appcommon.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CalendarFormComponent } from '../../../n-tire-bo-app/src/app/pages/forms/calendarform/calendarform.component';
import { boganttComponent } from '../../../n-tire-bo-app/src/app/pages/forms/bogantt/bogantt.component';

import { showdashboardComponent } from '../../../n-tire-dashboards-app/src/app/pages/forms/bodashboardviewer/showdashboard.component';


import { DashboardComponent } from '../../../n-tire-dashboards-app/src/app/pages/forms/dashboard/dashboard.component';
import { boworkflowdesignComponent } from '../../../n-tire-bo-app/src/app/pages/forms/boworkflowdesign/boworkflowdesign.component';

import { BODashboardViewerComponent } from '../../../n-tire-dashboards-app/src/app/pages/forms/bodashboardviewer/bodashboardviewer.component';

import { FieldErrorDisplayComponent } from '../../../n-tire-bo-app/src/app/pages/forms/field-error-display/field-error-display.component'


export const ENTRY_COMPONENTS = [];


export const routedComponents = [];


export const paths = [
    {
        path: '',
        children: [

            {//CalendarComponent   //, component: LayoutComponent,
                path: '',
                children: [

                    { path: 'showdashboard/:id', component: showdashboardComponent },
                    { path: 'bodashboardviewer/bodashboardviewer/:id', component: showdashboardComponent },
                    { path: 'calendar/:id', component: CalendarFormComponent },

                    { path: 'boreportviewer', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk/:fkname1/:fk1', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/view/:id/:pk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: "erptaxmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptaxmaster/erptaxmaster.module").then(m => m.erptaxmasterModule) },
                    { path: "erpregisteredsupplierproductcategories", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpregisteredsupplierproductcategory/erpregisteredsupplierproductcategory.module").then(m => m.erpregisteredsupplierproductcategoryModule) },
                    { path: "erpqcmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpqcmaster/erpqcmaster.module").then(m => m.erpqcmasterModule) },
                    { path: "erpcustomerinvoices", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcustomerinvoice/erpcustomerinvoice.module").then(m => m.erpcustomerinvoiceModule) },
                    { path: "erppurchaseorderpaymentterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchaseorderpaymentterm/erppurchaseorderpaymentterm.module").then(m => m.erppurchaseorderpaymenttermModule) },
                    { path: "erpcontractorderterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcontractorderterm/erpcontractorderterm.module").then(m => m.erpcontractordertermModule) },
                    { path: "erpbinlocationmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpbinlocationmaster/erpbinlocationmaster.module").then(m => m.erpbinlocationmasterModule) },
                    { path: "erpdcdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpdcdetail/erpdcdetail.module").then(m => m.erpdcdetailModule) },
                  //  { path: "ecmspecials", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/ecmspecial/ecmspecial.module").then(m => m.ecmspecialModule) },
                    { path: "erpsalesordermasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsalesordermaster/erpsalesordermaster.module").then(m => m.erpsalesordermasterModule) },
                    { path: "erpsupplieritemfeatures", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplieritemfeature/erpsupplieritemfeature.module").then(m => m.erpsupplieritemfeatureModule) },
                    { path: "erpiltdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpiltdetail/erpiltdetail.module").then(m => m.erpiltdetailModule) },
                    { path: "erpitemattributes", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpitemattribute/erpitemattribute.module").then(m => m.erpitemattributeModule) },
                    { path: "erpitembundledetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpitembundledetail/erpitembundledetail.module").then(m => m.erpitembundledetailModule) },
                    { path: "erpphysicalinventorydetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpphysicalinventorydetail/erpphysicalinventorydetail.module").then(m => m.erpphysicalinventorydetailModule) },
                    { path: "erpproductattributes", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductattribute/erpproductattribute.module").then(m => m.erpproductattributeModule) },
                    { path: "erppurchaseorderpaymentterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchaseorderpaymentterm/erppurchaseorderpaymentterm.module").then(m => m.erppurchaseorderpaymenttermModule) },
                    { path: "erpqcdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpqcdetail/erpqcdetail.module").then(m => m.erpqcdetailModule) },
                    { path: "erpquotationpaymentterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpquotationpaymentterm/erpquotationpaymentterm.module").then(m => m.erpquotationpaymenttermModule) },
                    { path: "erpregisteredsupplierproductcategories", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpregisteredsupplierproductcategory/erpregisteredsupplierproductcategory.module").then(m => m.erpregisteredsupplierproductcategoryModule) },
                    { path: "erprfqsuppliers", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erprfqsupplier/erprfqsupplier.module").then(m => m.erprfqsupplierModule) },
                    { path: "erpsupplieritemfeatures", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplieritemfeature/erpsupplieritemfeature.module").then(m => m.erpsupplieritemfeatureModule) },
                    { path: "erpsupplierpackingitems", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierpackingitem/erpsupplierpackingitem.module").then(m => m.erpsupplierpackingitemModule) },
                    { path: "erpproductpricehistories", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductpricehistory/erpproductpricehistory.module").then(m => m.erpproductpricehistoryModule) },
                    { path: "erpsupplierpaymentterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierpaymentterm/erpsupplierpaymentterm.module").then(m => m.erpsupplierpaymenttermModule) },
                    { path: "erpsupplierlocations", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierlocation/erpsupplierlocation.module").then(m => m.erpsupplierlocationModule) },
                    { path: "erpcontractclauses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcontractclause/erpcontractclause.module").then(m => m.erpcontractclauseModule) },
                    { path: "erptendersupplierresponsedetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendersupplierresponsedetail/erptendersupplierresponsedetail.module").then(m => m.erptendersupplierresponsedetailModule) },
                    { path: "erptenderaccesses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderaccess/erptenderaccess.module").then(m => m.erptenderaccessModule) },
                    { path: "erptaxcalculations", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptaxcalculation/erptaxcalculation.module").then(m => m.erptaxcalculationModule) },
                    { path: "erptendercompliances", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendercompliance/erptendercompliance.module").then(m => m.erptendercomplianceModule) },
                    { path: "erptendersuppliercomplianceresponses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendersuppliercomplianceresponse/erptendersuppliercomplianceresponse.module").then(m => m.erptendersuppliercomplianceresponseModule) },
                    { path: "erptendersupplierresponsedetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendersupplierresponsedetail/erptendersupplierresponsedetail.module").then(m => m.erptendersupplierresponsedetailModule) },
                    { path: "erpmaterialissuings", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpmaterialissuing/erpmaterialissuing.module").then(m => m.erpmaterialissuingModule) },
                    { path: "erptendersuppliercomplianceresponses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendersuppliercomplianceresponse/erptendersuppliercomplianceresponse.module").then(m => m.erptendersuppliercomplianceresponseModule) },
                    { path: "erpsupplieritems", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplieritem/erpsupplieritem.module").then(m => m.erpsupplieritemModule) },
                    { path: "erpsupplierpackingdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierpackingdetail/erpsupplierpackingdetail.module").then(m => m.erpsupplierpackingdetailModule) },
                    { path: "erpsupplierpackingdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierpackingdetail/erpsupplierpackingdetail.module").then(m => m.erpsupplierpackingdetailModule) },
                    { path: "erpphysicalinventorydetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpphysicalinventorydetail/erpphysicalinventorydetail.module").then(m => m.erpphysicalinventorydetailModule) },
                    { path: "erplocationmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erplocationmaster/erplocationmaster.module").then(m => m.erplocationmasterModule) },
                  //  { path: "ltymerchantproducts", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/ltymerchantproduct/ltymerchantproduct.module").then(m => m.ltymerchantproductModule) },
                    { path: "erpdcmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpdcmaster/erpdcmaster.module").then(m => m.erpdcmasterModule) },
                    { path: "erpproductpricehistories", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductpricehistory/erpproductpricehistory.module").then(m => m.erpproductpricehistoryModule) },
                    { path: "erpsupplierdocuments", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierdocument/erpsupplierdocument.module").then(m => m.erpsupplierdocumentModule) },
                    { path: "erppurchaseorderdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchaseorderdetail/erppurchaseorderdetail.module").then(m => m.erppurchaseorderdetailModule) },
                    { path: "erpitembundledetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpitembundledetail/erpitembundledetail.module").then(m => m.erpitembundledetailModule) },
                    { path: "erpcontractorderterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcontractorderterm/erpcontractorderterm.module").then(m => m.erpcontractordertermModule) },
                    { path: "erpitembundles", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpitembundle/erpitembundle.module").then(m => m.erpitembundleModule) },
                    { path: "erppartnercommissions", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppartnercommission/erppartnercommission.module").then(m => m.erppartnercommissionModule) },
                   // { path: "boactivities", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/boactivity/boactivity.module").then(m => m.boactivityModule) },
                    { path: "erpsupplierresponses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierresponse/erpsupplierresponse.module").then(m => m.erpsupplierresponseModule) },
                    { path: "erpsalesincentives", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsalesincentive/erpsalesincentive.module").then(m => m.erpsalesincentiveModule) },
                    { path: "erptaxcalculations", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptaxcalculation/erptaxcalculation.module").then(m => m.erptaxcalculationModule) },
                    { path: "erpsupplierinvoicedetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierinvoicedetail/erpsupplierinvoicedetail.module").then(m => m.erpsupplierinvoicedetailModule) },
                    { path: "erptenderquotationmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderquotationmaster/erptenderquotationmaster.module").then(m => m.erptenderquotationmasterModule) },
                    { path: "erptendermasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendermaster/erptendermaster.module").then(m => m.erptendermasterModule) },
                    { path: "erptenderdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderdetail/erptenderdetail.module").then(m => m.erptenderdetailModule) },
                    { path: "erptendercompliances", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendercompliance/erptendercompliance.module").then(m => m.erptendercomplianceModule) },
                    { path: "erptendersupplierresponses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendersupplierresponse/erptendersupplierresponse.module").then(m => m.erptendersupplierresponseModule) },
                    { path: "erpiltmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpiltmaster/erpiltmaster.module").then(m => m.erpiltmasterModule) },
                    { path: "erptenderquestions", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderquestion/erptenderquestion.module").then(m => m.erptenderquestionModule) },
                    { path: "erptenderquotationmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderquotationmaster/erptenderquotationmaster.module").then(m => m.erptenderquotationmasterModule) },
                    { path: "erptendersupplierresponses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendersupplierresponse/erptendersupplierresponse.module").then(m => m.erptendersupplierresponseModule) },
                    { path: "erpcontractordermasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcontractordermaster/erpcontractordermaster.module").then(m => m.erpcontractordermasterModule) },
                    { path: "erpproductattributes", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductattribute/erpproductattribute.module").then(m => m.erpproductattributeModule) },
                    { path: "erpitemattributes", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpitemattribute/erpitemattribute.module").then(m => m.erpitemattributeModule) },
                    { path: "erpsupplierquotationmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierquotationmaster/erpsupplierquotationmaster.module").then(m => m.erpsupplierquotationmasterModule) },
                   // { path: "ecmcustomerbaskets", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/ecmcustomerbasket/ecmcustomerbasket.module").then(m => m.ecmcustomerbasketModule) },
                    { path: "erpitemmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.module").then(m => m.erpitemmasterModule) },
                    { path: "erpsuppliermasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsuppliermaster/erpsuppliermaster.module").then(m => m.erpsuppliermasterModule) },
                    { path: "erpmaterialrequests", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpmaterialrequest/erpmaterialrequest.module").then(m => m.erpmaterialrequestModule) },
                    { path: "erppurchaseordermasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchaseordermaster/erppurchaseordermaster.module").then(m => m.erppurchaseordermasterModule) },
                    { path: "erpproducts", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproduct/erpproduct.module").then(m => m.erpproductModule) },
                    { path: "erppurchaserequests", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchaserequest/erppurchaserequest.module").then(m => m.erppurchaserequestModule) },
                    { path: "erpbudgetmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpbudgetmaster/erpbudgetmaster.module").then(m => m.erpbudgetmasterModule) },
                    { path: "erpmaterialrequestdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpmaterialrequestdetail/erpmaterialrequestdetail.module").then(m => m.erpmaterialrequestdetailModule) },
                    { path: "erprfqsuppliers", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erprfqsupplier/erprfqsupplier.module").then(m => m.erprfqsupplierModule) },
                    { path: "erpgoodsreceiptmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpgoodsreceiptmaster/erpgoodsreceiptmaster.module").then(m => m.erpgoodsreceiptmasterModule) },
                    { path: "erpproductfeatureparameters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductfeatureparameter/erpproductfeatureparameter.module").then(m => m.erpproductfeatureparameterModule) },
                    { path: "erpsupplierregistrations", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierregistration/erpsupplierregistration.module").then(m => m.erpsupplierregistrationModule) },
                    { path: "erpsupplieritems", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplieritem/erpsupplieritem.module").then(m => m.erpsupplieritemModule) },
                    { path: "erprfqdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erprfqdetail/erprfqdetail.module").then(m => m.erprfqdetailModule) },
                    { path: "erpproductfeatureparameters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductfeatureparameter/erpproductfeatureparameter.module").then(m => m.erpproductfeatureparameterModule) },
                    { path: "erprfqmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erprfqmaster/erprfqmaster.module").then(m => m.erprfqmasterModule) },
                    { path: "erppurchaseorderdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchaseorderdetail/erppurchaseorderdetail.module").then(m => m.erppurchaseorderdetailModule) },
                    { path: "erpphysicalinventorymasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpphysicalinventorymaster/erpphysicalinventorymaster.module").then(m => m.erpphysicalinventorymasterModule) },
                    { path: "erpsupplierpackingmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierpackingmaster/erpsupplierpackingmaster.module").then(m => m.erpsupplierpackingmasterModule) },
                    { path: "erpiltdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpiltdetail/erpiltdetail.module").then(m => m.erpiltdetailModule) },
                    { path: "erpsupplierinvoices", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierinvoice/erpsupplierinvoice.module").then(m => m.erpsupplierinvoiceModule) },
                    { path: "erprfqdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erprfqdetail/erprfqdetail.module").then(m => m.erprfqdetailModule) },
                    { path: "erpsupplierinvoices", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierinvoice/erpsupplierinvoice.module").then(m => m.erpsupplierinvoiceModule) },
                    { path: "erppurchaserequestdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchaserequestdetail/erppurchaserequestdetail.module").then(m => m.erppurchaserequestdetailModule) },
                    { path: "erpbinlocationmasters", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpbinlocationmaster/erpbinlocationmaster.module").then(m => m.erpbinlocationmasterModule) },
                    { path: "erprfqsuppliers", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erprfqsupplier/erprfqsupplier.module").then(m => m.erprfqsupplierModule) },
                    { path: "erpcontractorderclauses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcontractorderclause/erpcontractorderclause.module").then(m => m.erpcontractorderclauseModule) },
                    { path: "erpcontractorderdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcontractorderdetail/erpcontractorderdetail.module").then(m => m.erpcontractorderdetailModule) },
                    //{ path: "ecmreviews", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/ecmreview/ecmreview.module").then(m => m.ecmreviewModule) },
                    { path: "erpcontractorderclauses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcontractorderclause/erpcontractorderclause.module").then(m => m.erpcontractorderclauseModule) },
                    { path: "erpcustomerinvoicedetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcustomerinvoicedetail/erpcustomerinvoicedetail.module").then(m => m.erpcustomerinvoicedetailModule) },
                    { path: "erpgoodsreceiptdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpgoodsreceiptdetail/erpgoodsreceiptdetail.module").then(m => m.erpgoodsreceiptdetailModule) },
                    { path: "erpitemimages", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpitemimage/erpitemimage.module").then(m => m.erpitemimageModule) },
                    { path: "erpmaterialrequestdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpmaterialrequestdetail/erpmaterialrequestdetail.module").then(m => m.erpmaterialrequestdetailModule) },
                    { path: "erpproductaccesses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductaccess/erpproductaccess.module").then(m => m.erpproductaccessModule) },
                    { path: "erpproductimages", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductimage/erpproductimage.module").then(m => m.erpproductimageModule) },
                    { path: "erppurchaserequestdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchaserequestdetail/erppurchaserequestdetail.module").then(m => m.erppurchaserequestdetailModule) },
                    { path: "erppurchaserequestdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchaserequestdetail/erppurchaserequestdetail.module").then(m => m.erppurchaserequestdetailModule) },
                    { path: "erppurchasesubdeliverydetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchasesubdeliverydetail/erppurchasesubdeliverydetail.module").then(m => m.erppurchasesubdeliverydetailModule) },
                    { path: "erprfqsuppliers", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erprfqsupplier/erprfqsupplier.module").then(m => m.erprfqsupplierModule) },
                    { path: "erpsalesorderdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsalesorderdetail/erpsalesorderdetail.module").then(m => m.erpsalesorderdetailModule) },
                    { path: "erpsalesorderpaymentterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsalesorderpaymentterm/erpsalesorderpaymentterm.module").then(m => m.erpsalesorderpaymenttermModule) },
                    { path: "erpsuppliercertifications", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsuppliercertification/erpsuppliercertification.module").then(m => m.erpsuppliercertificationModule) },
                    { path: "erpsupplierfinancialdatas", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierfinancialdata/erpsupplierfinancialdata.module").then(m => m.erpsupplierfinancialdataModule) },
                    { path: "erpsupplierinvoicedetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierinvoicedetail/erpsupplierinvoicedetail.module").then(m => m.erpsupplierinvoicedetailModule) },
                    { path: "erpsupplierquotationdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierquotationdetail/erpsupplierquotationdetail.module").then(m => m.erpsupplierquotationdetailModule) },
                    { path: "erpsupplierreferences", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierreference/erpsupplierreference.module").then(m => m.erpsupplierreferenceModule) },
                    { path: "erptenderaccesses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderaccess/erptenderaccess.module").then(m => m.erptenderaccessModule) },
                    { path: "erpsupplierdocuments", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierdocument/erpsupplierdocument.module").then(m => m.erpsupplierdocumentModule) },
                    { path: "erptendercorrigendums", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendercorrigendum/erptendercorrigendum.module").then(m => m.erptendercorrigendumModule) },
                    { path: "erptenderdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderdetail/erptenderdetail.module").then(m => m.erptenderdetailModule) },
                    { path: "erptenderquestions", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderquestion/erptenderquestion.module").then(m => m.erptenderquestionModule) },
                    { path: "erptenderquotationanswers", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderquotationanswer/erptenderquotationanswer.module").then(m => m.erptenderquotationanswerModule) },
                    { path: "erptenderquotationdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderquotationdetail/erptenderquotationdetail.module").then(m => m.erptenderquotationdetailModule) },
                    { path: "erpdcdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpdcdetail/erpdcdetail.module").then(m => m.erpdcdetailModule) },
                    { path: "erpsupplierquotationdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierquotationdetail/erpsupplierquotationdetail.module").then(m => m.erpsupplierquotationdetailModule) },
                    { path: "erptenderquotationdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderquotationdetail/erptenderquotationdetail.module").then(m => m.erptenderquotationdetailModule) },
                    { path: "erpsalesorderdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsalesorderdetail/erpsalesorderdetail.module").then(m => m.erpsalesorderdetailModule) },
                    { path: "erpsalesorderpaymentterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsalesorderpaymentterm/erpsalesorderpaymentterm.module").then(m => m.erpsalesorderpaymenttermModule) },
                    { path: "erpsupplierpackingitems", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierpackingitem/erpsupplierpackingitem.module").then(m => m.erpsupplierpackingitemModule) },
                    { path: "erpsupplierreferences", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierreference/erpsupplierreference.module").then(m => m.erpsupplierreferenceModule) },
                    { path: "erpsupplierpaymentterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierpaymentterm/erpsupplierpaymentterm.module").then(m => m.erpsupplierpaymenttermModule) },
                    { path: "erpsupplierfinancialdatas", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierfinancialdata/erpsupplierfinancialdata.module").then(m => m.erpsupplierfinancialdataModule) },
                    { path: "erpquotationpaymentterms", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpquotationpaymentterm/erpquotationpaymentterm.module").then(m => m.erpquotationpaymenttermModule) },
                    { path: "erpsupplierlocations", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierlocation/erpsupplierlocation.module").then(m => m.erpsupplierlocationModule) },
                    { path: "erpsuppliercertifications", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpsuppliercertification/erpsuppliercertification.module").then(m => m.erpsuppliercertificationModule) },
                    { path: "erpproductaccesses", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductaccess/erpproductaccess.module").then(m => m.erpproductaccessModule) },
                    { path: "erppurchasesubdeliverydetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erppurchasesubdeliverydetail/erppurchasesubdeliverydetail.module").then(m => m.erppurchasesubdeliverydetailModule) },
                    { path: "erpcustomerinvoicedetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcustomerinvoicedetail/erpcustomerinvoicedetail.module").then(m => m.erpcustomerinvoicedetailModule) },
                    { path: "erptendercorrigendums", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptendercorrigendum/erptendercorrigendum.module").then(m => m.erptendercorrigendumModule) },
                    { path: "erpitemimages", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpitemimage/erpitemimage.module").then(m => m.erpitemimageModule) },
                    { path: "erpproductimages", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpproductimage/erpproductimage.module").then(m => m.erpproductimageModule) },
                    { path: "erpgoodsreceiptdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpgoodsreceiptdetail/erpgoodsreceiptdetail.module").then(m => m.erpgoodsreceiptdetailModule) },
                    { path: "erptenderquotationanswers", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erptenderquotationanswer/erptenderquotationanswer.module").then(m => m.erptenderquotationanswerModule) },
                    { path: "erpqcdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpqcdetail/erpqcdetail.module").then(m => m.erpqcdetailModule) },
                    { path: "erpcontractorderdetails", loadChildren: () => import("../../../n-tire-procurement-app/src/app/pages/forms/erpcontractorderdetail/erpcontractorderdetail.module").then(m => m.erpcontractorderdetailModule) },
                    { path: 'hlptickets', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpticket/hlpticket.module").then(m => m.hlpticketModule) },
                    { path: 'erpfapayments', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfapayment/erpfapayment.module').then(m => m.erpfapaymentModule) },

                    { path: 'bocontacts', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocontact/bocontact.module').then(m => m.bocontactModule) },
                ]
            },
        ]
    },
];



console.log(paths);
console.log(paths[0].children[0].children);
//(paths[0].children as any)

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({

    exports: [],

    declarations: [

        ...routedComponents,
        DashboardComponent,
    ],
    imports: [

        //NgCommonModule,
        RouterModule.forChild(paths),
        FormsModule, ReactiveFormsModule,
        CommonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        ...ENTRY_COMPONENTS
    ],

})
export class NgPrimeModule { }

