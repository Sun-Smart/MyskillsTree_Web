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

                    { path: 'hlpticketdetails', loadChildren: () => import('../../../n-tire-help-desk-app/src/app/pages/forms/hlpticketdetail/hlpticketdetail.module').then(m => m.hlpticketdetailModule) },
                    { path: 'qyrelatedcomplaints', loadChildren: () => import('../../../n-tire-help-desk-app/src/app/pages/forms/qyrelatedcomplaint/qyrelatedcomplaint.module').then(m => m.qyrelatedcomplaintModule) },
                    { path: 'qyrelatedgrievances', loadChildren: () => import('../../../n-tire-help-desk-app/src/app/pages/forms/qyrelatedgrievance/qyrelatedgrievance.module').then(m => m.qyrelatedgrievanceModule) },
                    { path: 'hlptickets', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpticket/hlpticket.module").then(m => m.hlpticketModule) },
                    { path: 'qycomplaintmasters', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/qycomplaintmaster/qycomplaintmaster.module").then(m => m.qycomplaintmasterModule) },
                    { path: 'qyrelatedgrievances', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/qyrelatedgrievance/qyrelatedgrievance.module").then(m => m.qyrelatedgrievanceModule) },
                    { path: 'qyrelatedcomplaints', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/qyrelatedcomplaint/qyrelatedcomplaint.module").then(m => m.qyrelatedcomplaintModule) },
                    { path: 'hlpslapriorities', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpslapriority/hlpslapriority.module").then(m => m.hlpslapriorityModule) },
                    { path: 'hlpslasupporthours', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpslasupporthour/hlpslasupporthour.module").then(m => m.hlpslasupporthourModule) },
                    { path: 'hlpplannedactions', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpplannedaction/hlpplannedaction.module").then(m => m.hlpplannedactionModule) },
                    { path: 'hlpcapacityplans', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpcapacityplan/hlpcapacityplan.module").then(m => m.hlpcapacityplanModule) },
                    { path: 'hlpservicelevels', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpservicelevel/hlpservicelevel.module").then(m => m.hlpservicelevelModule) },
                    { path: 'hlpserviceavailabilities', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpserviceavailability/hlpserviceavailability.module").then(m => m.hlpserviceavailabilityModule) },
                    { path: 'qygrievancemasters', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/qygrievancemaster/qygrievancemaster.module").then(m => m.qygrievancemasterModule) },
                    { path: 'hlpservicecontinuityplandetails', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpservicecontinuityplandetail/hlpservicecontinuityplandetail.module").then(m => m.hlpservicecontinuityplandetailModule) },
                    { path: 'hlpservicecontinuityplans', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpservicecontinuityplan/hlpservicecontinuityplan.module").then(m => m.hlpservicecontinuityplanModule) },
                    { path: 'hlpticketdetails', loadChildren: () => import("../../../n-tire-help-desk-app/src/app/pages/forms/hlpticketdetail/hlpticketdetail.module").then(m => m.hlpticketdetailModule) },                   
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

