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
                    { path: 'hmsadmissions', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmsadmission/hmsadmission.module').then(m => m.hmsadmissionModule) },
{ path: 'hmsappointments', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmsappointment/hmsappointment.module').then(m => m.hmsappointmentModule) },
{ path: 'hmsbeds', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmsbed/hmsbed.module').then(m => m.hmsbedModule) },
{ path: 'hmsconsents', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmsconsent/hmsconsent.module').then(m => m.hmsconsentModule) },
{ path: 'hmsdoctornetworks', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmsdoctornetwork/hmsdoctornetwork.module').then(m => m.hmsdoctornetworkModule) },
{ path: 'hmsestimatedetails', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmsestimatedetail/hmsestimatedetail.module').then(m => m.hmsestimatedetailModule) },
{ path: 'hmsinsurances', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmsinsurance/hmsinsurance.module').then(m => m.hmsinsuranceModule) },
{ path: 'hmsoperations', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmsoperation/hmsoperation.module').then(m => m.hmsoperationModule) },
{ path: 'hmspatientdischarges', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmspatientdischarge/hmspatientdischarge.module').then(m => m.hmspatientdischargeModule) },
{ path: 'hmspatientfollowups', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmspatientfollowup/hmspatientfollowup.module').then(m => m.hmspatientfollowupModule) },
{ path: 'hmspatientpaymentdetails', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmspatientpaymentdetail/hmspatientpaymentdetail.module').then(m => m.hmspatientpaymentdetailModule) },
{ path: 'hmspatientvaccinations', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmspatientvaccination/hmspatientvaccination.module').then(m => m.hmspatientvaccinationModule) },
{ path: 'hmspatientvisits', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmspatientvisit/hmspatientvisit.module').then(m => m.hmspatientvisitModule) },
{ path: 'hmswardincharges', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmswardincharge/hmswardincharge.module').then(m => m.hmswardinchargeModule) },
{ path: 'hmswardrounds', loadChildren: () => import('../../../n-tire-hospital-app/src/app/pages/forms/hmswardround/hmswardround.module').then(m => m.hmswardroundModule) },

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

