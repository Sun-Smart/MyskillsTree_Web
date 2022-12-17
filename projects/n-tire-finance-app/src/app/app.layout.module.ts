import { NgCommonModule } from './appcommon.module';
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
                    { path: 'erpfaaccountbalancefinyears', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountbalancefinyear/erpfaaccountbalancefinyear.module').then(m => m.erpfaaccountbalancefinyearModule) },
                    { path: 'erpfaaccountbalancemonths', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountbalancemonth/erpfaaccountbalancemonth.module').then(m => m.erpfaaccountbalancemonthModule) },
                    { path: 'erpfaaccountmasters', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.module').then(m => m.erpfaaccountmasterModule) },
                    { path: 'erpfaaccountperiodmasters', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfaaccountperiodmaster/erpfaaccountperiodmaster.module').then(m => m.erpfaaccountperiodmasterModule) },
                    //{ path: 'erpfaapentries', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfaapentry/erpfaapentry.module').then(m => m.erpfaapentryModule) },
                    //{ path: 'erpfaarbookings', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfaarbooking/erpfaarbooking.module').then(m => m.erpfaarbookingModule) },
                    { path: 'erpfabankaccounts', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfabankaccount/erpfabankaccount.module').then(m => m.erpfabankaccountModule) },
                    { path: 'erpfabudgets', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfabudget/erpfabudget.module').then(m => m.erpfabudgetModule) },
                    { path: 'erpfachequebooks', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfachequebook/erpfachequebook.module').then(m => m.erpfachequebookModule) },
                    { path: 'erpfachequestatuses', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfachequestatus/erpfachequestatus.module').then(m => m.erpfachequestatusModule) },
                    { path: 'erpfacostcategories', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfacostcategory/erpfacostcategory.module').then(m => m.erpfacostcategoryModule) },
                  //  { path: 'erpfacostcategoryglmappings', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfacostcategoryglmapping/erpfacostcategoryglmapping.module').then(m => m.erpfacostcategoryglmappingModule) },
                    { path: 'erpfacreditdebitnotes', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfacreditdebitnote/erpfacreditdebitnote.module').then(m => m.erpfacreditdebitnoteModule) },
                    { path: 'erpfajournals', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfajournal/erpfajournal.module').then(m => m.erpfajournalModule) },
                    { path: 'erpfamergeaccounts', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfamergeaccount/erpfamergeaccount.module').then(m => m.erpfamergeaccountModule) },
                    { path: 'erpfapayments', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfapayment/erpfapayment.module').then(m => m.erpfapaymentModule) },
                  //  { path: 'erpfareceipts', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfareceipt/erpfareceipt.module').then(m => m.erpfareceiptModule) },
                    
                  { path: 'erpfacostcenters', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfacostcenter/erpfacostcenter.module').then(m => m.erpfacostcenterModule) },
//{ path: 'erpfacustomerreceiptdetails', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfacustomerreceiptdetail/erpfacustomerreceiptdetail.module').then(m => m.erpfacustomerreceiptdetailModule) },
//{ path: 'erpfajournalcostcenters', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfajournalcostcenter/erpfajournalcostcenter.module').then(m => m.erpfajournalcostcenterModule) },
//{ path: 'erpfajournaldetails', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfajournaldetail/erpfajournaldetail.module').then(m => m.erpfajournaldetailModule) },
//{ path: 'erpfapaymentdetails', loadChildren: () => import('../../../n-tire-finance-app/src/app/pages/forms/erpfapaymentdetail/erpfapaymentdetail.module').then(m => m.erpfapaymentdetailModule) },

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

