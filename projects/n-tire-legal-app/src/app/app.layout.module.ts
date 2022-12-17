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

                    { path: 'boreportviewer', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk/:fkname1/:fk1', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/view/:id/:pk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },



                    { path: 'legalcases', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcase/legalcase.module').then(m => m.legalcaseModule) },
                    { path: 'legalcourtmasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcourtmaster/legalcourtmaster.module').then(m => m.legalcourtmasterModule) },
                    { path: 'legalcourtprocessmasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcourtprocessmaster/legalcourtprocessmaster.module').then(m => m.legalcourtprocessmasterModule) },
                    { path: 'legalcustomerinvoices', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcustomerinvoice/legalcustomerinvoice.module').then(m => m.legalcustomerinvoiceModule) },
                    { path: 'legalcustomermasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcustomermaster/legalcustomermaster.module').then(m => m.legalcustomermasterModule) },
                    { path: 'legalinterdepartmentqueries', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalinterdepartmentquery/legalinterdepartmentquery.module').then(m => m.legalinterdepartmentqueryModule) },
                    { path: 'legallawyermasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legallawyermaster/legallawyermaster.module').then(m => m.legallawyermasterModule) },
                    { path: 'legalmatters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalmatter/legalmatter.module').then(m => m.legalmatterModule) },
                    { path: 'legaltaskmasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legaltaskmaster/legaltaskmaster.module').then(m => m.legaltaskmasterModule) },
                    { path: 'legalcaseagainstemployees', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcaseagainstemployee/legalcaseagainstemployee.module').then(m => m.legalcaseagainstemployeeModule) },
                    { path: 'legalcaseinterimorders', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcaseinterimorder/legalcaseinterimorder.module').then(m => m.legalcaseinterimorderModule) },
                    { path: 'legalcasekbs', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcasekb/legalcasekb.module').then(m => m.legalcasekbModule) },
                    { path: 'legalcaselawyers', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcaselawyer/legalcaselawyer.module').then(m => m.legalcaselawyerModule) },
                    { path: 'legalcasehearings', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcasehearing/legalcasehearing.module').then(m => m.legalcasehearingModule) },
                    { path: 'legalcasepartydetails', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcasepartydetail/legalcasepartydetail.module').then(m => m.legalcasepartydetailModule) },
                    { path: 'legalcaseprocessdetails', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcaseprocessdetail/legalcaseprocessdetail.module').then(m => m.legalcaseprocessdetailModule) },
                    { path: 'legalcasehearingdetailnotes', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcasehearingdetailnote/legalcasehearingdetailnote.module').then(m => m.legalcasehearingdetailnoteModule) },
                    { path: 'legalcasereferredcases', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcasereferredcase/legalcasereferredcase.module').then(m => m.legalcasereferredcaseModule) },
                    { path: 'legalcaserespondentdetails', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcaserespondentdetail/legalcaserespondentdetail.module').then(m => m.legalcaserespondentdetailModule) },
                    { path: 'legalcommunicationdetails', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcommunicationdetail/legalcommunicationdetail.module').then(m => m.legalcommunicationdetailModule) },
                    { path: 'legalcourtbranchmasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcourtbranchmaster/legalcourtbranchmaster.module').then(m => m.legalcourtbranchmasterModule) },
                    { path: 'legalcustomerinvoicedetails', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcustomerinvoicedetail/legalcustomerinvoicedetail.module').then(m => m.legalcustomerinvoicedetailModule) },
                    { path: 'legalfreenotes', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalfreenote/legalfreenote.module').then(m => m.legalfreenoteModule) },
                    { path: 'legalinterdepartmentqueryresponses', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalinterdepartmentqueryresponse/legalinterdepartmentqueryresponse.module').then(m => m.legalinterdepartmentqueryresponseModule) },
                    { path: 'legallawyercourts', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legallawyercourt/legallawyercourt.module').then(m => m.legallawyercourtModule) },
                    { path: 'legalmatterresponses', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalmatterresponse/legalmatterresponse.module').then(m => m.legalmatterresponseModule) },
                    { path: 'legalopponentmasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalopponentmaster/legalopponentmaster.module').then(m => m.legalopponentmasterModule) },
                    { path: 'legaltaskresponses', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legaltaskresponse/legaltaskresponse.module').then(m => m.legaltaskresponseModule) },

                    
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

