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

                    { path: 'lmsassigns', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsassign/lmsassign.module').then(m => m.lmsassignModule) },
                    { path: 'lmscalls', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscall/lmscall.module').then(m => m.lmscallModule) },
                    { path: 'lmscampaignmasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscampaignmaster/lmscampaignmaster.module').then(m => m.lmscampaignmasterModule) },
                    { path: 'lmscampaigntasks', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscampaigntask/lmscampaigntask.module').then(m => m.lmscampaigntaskModule) },
                    { path: 'lmscorporatesecondarycontacts', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.module').then(m => m.lmscorporatesecondarycontactModule) },
                    { path: 'lmsmasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsmaster/lmsmaster.module').then(m => m.lmsmasterModule) },
                    { path: 'lmsopportunities', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsopportunity/lmsopportunity.module').then(m => m.lmsopportunityModule) },
                    { path: 'lmsproductmasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsproductmaster/lmsproductmaster.module').then(m => m.lmsproductmasterModule) },
                    { path: 'lmsresponses', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsresponse/lmsresponse.module').then(m => m.lmsresponseModule) },
                    { path: 'lmsscoringfixedfieldsnegatives', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsscoringfixedfieldsnegative/lmsscoringfixedfieldsnegative.module').then(m => m.lmsscoringfixedfieldsnegativeModule) },
                    { path: 'lmsscoringfixedfieldspositives', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsscoringfixedfieldspositive/lmsscoringfixedfieldspositive.module').then(m => m.lmsscoringfixedfieldspositiveModule) },
                    { path: 'lmsscoringplannedclosedates', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsscoringplannedclosedate/lmsscoringplannedclosedate.module').then(m => m.lmsscoringplannedclosedateModule) },
                    { path: 'lmstargetbranchlevels', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmstargetbranchlevel/lmstargetbranchlevel.module').then(m => m.lmstargetbranchlevelModule) },
                    { path: 'lmstargetorglevels', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmstargetorglevel/lmstargetorglevel.module').then(m => m.lmstargetorglevelModule) },
                    { path: 'lmstargetuserlevels', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmstargetuserlevel/lmstargetuserlevel.module').then(m => m.lmstargetuserlevelModule) },
                    { path: 'lmstasks', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmstask/lmstask.module').then(m => m.lmstaskModule) },


                    { path: 'crmcustomeraccountmasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/crmcustomeraccountmaster/crmcustomeraccountmaster.module').then(m => m.crmcustomeraccountmasterModule) },
                    { path: 'crmcustomermasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.module').then(m => m.crmcustomermasterModule) },
                    { path: 'crmcustomerservices', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/crmcustomerservice/crmcustomerservice.module').then(m => m.crmcustomerserviceModule) },
                    { path: 'crmindexmasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/crmindexmaster/crmindexmaster.module').then(m => m.crmindexmasterModule) },
                    { path: 'crmtickets', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/crmticket/crmticket.module').then(m => m.crmticketModule) },
                    { path: 'crmcustomeraccounttransactions', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/crmcustomeraccounttransaction/crmcustomeraccounttransaction.module').then(m => m.crmcustomeraccounttransactionModule) },
                    { path: 'crmcustomerkycmasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/crmcustomerkycmaster/crmcustomerkycmaster.module').then(m => m.crmcustomerkycmasterModule) },
                    { path: 'crmindexdetails', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/crmindexdetail/crmindexdetail.module').then(m => m.crmindexdetailModule) },
                    { path: 'lmsbundledproducts', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsbundledproduct/lmsbundledproduct.module').then(m => m.lmsbundledproductModule) },
                    { path: 'lmscampaignlocations', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscampaignlocation/lmscampaignlocation.module').then(m => m.lmscampaignlocationModule) },
                    { path: 'lmscampaignnoaccesses', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscampaignnoaccess/lmscampaignnoaccess.module').then(m => m.lmscampaignnoaccessModule) },
                    { path: 'lmscampaigntaskresponses', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscampaigntaskresponse/lmscampaigntaskresponse.module').then(m => m.lmscampaigntaskresponseModule) },
                    { path: 'lmshistories', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmshistory/lmshistory.module').then(m => m.lmshistoryModule) },
                    { path: 'lmsopportunityproducts', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsopportunityproduct/lmsopportunityproduct.module').then(m => m.lmsopportunityproductModule) },
                    { path: 'lmsquotedetails', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsquotedetail/lmsquotedetail.module').then(m => m.lmsquotedetailModule) },
                    { path: 'lmsreminders', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsreminder/lmsreminder.module').then(m => m.lmsreminderModule) },
                    { path: 'lmssecondarycontacts', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmssecondarycontact/lmssecondarycontact.module').then(m => m.lmssecondarycontactModule) },
                    { path: 'lmssubresponses', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmssubresponse/lmssubresponse.module').then(m => m.lmssubresponseModule) },
                    { path: 'lmstaskresponses', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmstaskresponse/lmstaskresponse.module').then(m => m.lmstaskresponseModule) },

                    { path: 'boexpenses', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boexpense/boexpense.module').then(m => m.boexpenseModule) },


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

