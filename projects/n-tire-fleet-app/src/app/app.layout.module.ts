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
                    { path: 'flmaccidents', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flmaccident/flmaccident.module').then(m => m.flmaccidentModule) },
{ path: 'flmassignments', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flmassignment/flmassignment.module').then(m => m.flmassignmentModule) },
{ path: 'flmexpenses', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flmexpense/flmexpense.module').then(m => m.flmexpenseModule) },
{ path: 'flminspections', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flminspection/flminspection.module').then(m => m.flminspectionModule) },
{ path: 'flminsurances', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flminsurance/flminsurance.module').then(m => m.flminsuranceModule) },
{ path: 'flmrelatedvehicles', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flmrelatedvehicle/flmrelatedvehicle.module').then(m => m.flmrelatedvehicleModule) },
{ path: 'flmservicerequestdetails', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flmservicerequestdetail/flmservicerequestdetail.module').then(m => m.flmservicerequestdetailModule) },
{ path: 'flmvehicleissues', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flmvehicleissue/flmvehicleissue.module').then(m => m.flmvehicleissueModule) },
{ path: 'flmvehiclepermits', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flmvehiclepermit/flmvehiclepermit.module').then(m => m.flmvehiclepermitModule) },
{ path: 'flmvehicleusages', loadChildren: () => import('../../../n-tire-fleet-app/src/app/pages/forms/flmvehicleusage/flmvehicleusage.module').then(m => m.flmvehicleusageModule) },

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

