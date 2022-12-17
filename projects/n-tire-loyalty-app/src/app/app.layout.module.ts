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

                    { path: 'showdashboard/:id', component: showdashboardComponent },
                    { path: 'bodashboardviewer/bodashboardviewer/:id', component: showdashboardComponent },
                    { path: 'calendar/:id', component: CalendarFormComponent },

                    { path: 'boreportviewer', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk/:fkname1/:fk1', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/view/:id/:pk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },

                    
                    { path: 'ltymerchantproducts', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltymerchantproduct/ltymerchantproduct.module').then(m => m.ltymerchantproductModule) },

                    { path: 'ltystores', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltystore/ltystore.module').then(m => m.ltystoreModule) },
                    { path: 'ltycustomerlevels', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltycustomerlevel/ltycustomerlevel.module').then(m => m.ltycustomerlevelModule) },
                    { path: 'ltymerchants', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltymerchant/ltymerchant.module').then(m => m.ltymerchantModule) },
                    { path: 'ltytransactions', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltytransaction/ltytransaction.module').then(m => m.ltytransactionModule) },
                    { path: 'ltyreferrals', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltyreferral/ltyreferral.module').then(m => m.ltyreferralModule) },
                    { path: 'ltycustomersegments', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltycustomersegment/ltycustomersegment.module').then(m => m.ltycustomersegmentModule) },
                    { path: 'ltyproductsegments', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltyproductsegment/ltyproductsegment.module').then(m => m.ltyproductsegmentModule) },
                    { path: 'ltyeventsegments', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltyeventsegment/ltyeventsegment.module').then(m => m.ltyeventsegmentModule) },
                    { path: 'ltymerchantsegments', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltymerchantsegment/ltymerchantsegment.module').then(m => m.ltymerchantsegmentModule) },
                    { path: 'ltyrewardsegments', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltyrewardsegment/ltyrewardsegment.module').then(m => m.ltyrewardsegmentModule) },
                    { path: 'ltytransactionsegments', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltytransactionsegment/ltytransactionsegment.module').then(m => m.ltytransactionsegmentModule) },

                    { path: 'ltyloyaltyaudittrails', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltyloyaltyaudittrail/ltyloyaltyaudittrail.module').then(m => m.ltyloyaltyaudittrailModule) },
                    { path: 'ltycampaigns', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltycampaign/ltycampaign.module').then(m => m.ltycampaignModule) },
                    { path: 'ltypointtransfers', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltypointtransfer/ltypointtransfer.module').then(m => m.ltypointtransferModule) },
                    { path: 'ltylevels', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltylevel/ltylevel.module').then(m => m.ltylevelModule) },

                    { path: 'ltylists', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltylist/ltylist.module').then(m => m.ltylistModule) },
                    { path: 'ltyredeems', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltyredeem/ltyredeem.module').then(m => m.ltyredeemModule) },
                    { path: 'ltycoupontypes', loadChildren: () => import('../../../n-tire-loyalty-app/src/app/pages/forms/ltycoupontype/ltycoupontype.module').then(m => m.ltycoupontypeModule) },


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

