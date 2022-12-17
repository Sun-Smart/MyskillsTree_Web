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
                    { path: 'hrmsadvertisementdetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsadvertisementdetail/hrmsadvertisementdetail.module').then(m => m.hrmsadvertisementdetailModule) },
{ path: 'hrmsapplicantcareers', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsapplicantcareer/hrmsapplicantcareer.module').then(m => m.hrmsapplicantcareerModule) },
{ path: 'hrmsapplicanteducations', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsapplicanteducation/hrmsapplicanteducation.module').then(m => m.hrmsapplicanteducationModule) },
{ path: 'hrmsapplicantskills', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsapplicantskill/hrmsapplicantskill.module').then(m => m.hrmsapplicantskillModule) },
{ path: 'hrmsbudgetdetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsbudgetdetail/hrmsbudgetdetail.module').then(m => m.hrmsbudgetdetailModule) },
{ path: 'hrmsemployeedependents', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeedependent/hrmsemployeedependent.module').then(m => m.hrmsemployeedependentModule) },
{ path: 'hrmsemployeeinsurances', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeeinsurance/hrmsemployeeinsurance.module').then(m => m.hrmsemployeeinsuranceModule) },
{ path: 'hrmsemployeeloandetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeeloandetail/hrmsemployeeloandetail.module').then(m => m.hrmsemployeeloandetailModule) },
{ path: 'hrmsemployeemonthlyadhoccredits', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeemonthlyadhoccredit/hrmsemployeemonthlyadhoccredit.module').then(m => m.hrmsemployeemonthlyadhoccreditModule) },
{ path: 'hrmsemployeemonthlyadhocdebits', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeemonthlyadhocdebit/hrmsemployeemonthlyadhocdebit.module').then(m => m.hrmsemployeemonthlyadhocdebitModule) },
{ path: 'hrmsemployeemonthlysalaryannualincomes', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeemonthlysalaryannualincome/hrmsemployeemonthlysalaryannualincome.module').then(m => m.hrmsemployeemonthlysalaryannualincomeModule) },
{ path: 'hrmsemployeemonthlysalaryregulardeductions', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeemonthlysalaryregulardeduction/hrmsemployeemonthlysalaryregulardeduction.module').then(m => m.hrmsemployeemonthlysalaryregulardeductionModule) },
{ path: 'hrmsemployeemonthlysalaryregularincomes', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeemonthlysalaryregularincome/hrmsemployeemonthlysalaryregularincome.module').then(m => m.hrmsemployeemonthlysalaryregularincomeModule) },
{ path: 'hrmsemployeeshifts', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeeshift/hrmsemployeeshift.module').then(m => m.hrmsemployeeshiftModule) },
{ path: 'hrmsemployeetrainings', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeetraining/hrmsemployeetraining.module').then(m => m.hrmsemployeetrainingModule) },
{ path: 'hrmseosdetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmseosdetail/hrmseosdetail.module').then(m => m.hrmseosdetailModule) },
{ path: 'hrmseosroles', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmseosrole/hrmseosrole.module').then(m => m.hrmseosroleModule) },
{ path: 'hrmsinductionattendances', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsinductionattendance/hrmsinductionattendance.module').then(m => m.hrmsinductionattendanceModule) },
{ path: 'hrmsinductionemployees', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsinductionemployee/hrmsinductionemployee.module').then(m => m.hrmsinductionemployeeModule) },
{ path: 'hrmsinterviewrolescorings', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsinterviewrolescoring/hrmsinterviewrolescoring.module').then(m => m.hrmsinterviewrolescoringModule) },
{ path: 'hrmsinterviewscorings', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsinterviewscoring/hrmsinterviewscoring.module').then(m => m.hrmsinterviewscoringModule) },
{ path: 'hrmskpimasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmskpimaster/hrmskpimaster.module').then(m => m.hrmskpimasterModule) },
{ path: 'hrmsloanschemedetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsloanschemedetail/hrmsloanschemedetail.module').then(m => m.hrmsloanschemedetailModule) },
{ path: 'hrmsmpragencies', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsmpragency/hrmsmpragency.module').then(m => m.hrmsmpragencyModule) },
{ path: 'hrmsmprapplicants', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsmprapplicant/hrmsmprapplicant.module').then(m => m.hrmsmprapplicantModule) },
{ path: 'hrmsmprassigns', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsmprassign/hrmsmprassign.module').then(m => m.hrmsmprassignModule) },
{ path: 'hrmsodadvances', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsodadvance/hrmsodadvance.module').then(m => m.hrmsodadvanceModule) },
{ path: 'hrmsodclaims', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsodclaim/hrmsodclaim.module').then(m => m.hrmsodclaimModule) },
{ path: 'hrmsodtravels', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsodtravel/hrmsodtravel.module').then(m => m.hrmsodtravelModule) },
{ path: 'hrmspadecisionmanagements', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmspadecisionmanagement/hrmspadecisionmanagement.module').then(m => m.hrmspadecisionmanagementModule) },
{ path: 'hrmsparesponses', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsparesponse/hrmsparesponse.module').then(m => m.hrmsparesponseModule) },
{ path: 'hrmssalaryannualincomes', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmssalaryannualincome/hrmssalaryannualincome.module').then(m => m.hrmssalaryannualincomeModule) },
{ path: 'hrmssalaryregulardeductions', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmssalaryregulardeduction/hrmssalaryregulardeduction.module').then(m => m.hrmssalaryregulardeductionModule) },
{ path: 'hrmssalaryregularincomes', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmssalaryregularincome/hrmssalaryregularincome.module').then(m => m.hrmssalaryregularincomeModule) },
{ path: 'hrmsstatutorydetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsstatutorydetail/hrmsstatutorydetail.module').then(m => m.hrmsstatutorydetailModule) },
{ path: 'hrmsstatutoryroles', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsstatutoryrole/hrmsstatutoryrole.module').then(m => m.hrmsstatutoryroleModule) },
{ path: 'hrmstrainingattendances', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmstrainingattendance/hrmstrainingattendance.module').then(m => m.hrmstrainingattendanceModule) },
{ path: 'hrmstrainingfeedbacktrainees', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmstrainingfeedbacktrainee/hrmstrainingfeedbacktrainee.module').then(m => m.hrmstrainingfeedbacktraineeModule) },
{ path: 'hrmstrainingfeedbacktrainers', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmstrainingfeedbacktrainer/hrmstrainingfeedbacktrainer.module').then(m => m.hrmstrainingfeedbacktrainerModule) },
{ path: 'hrmstrainingparticipants', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmstrainingparticipant/hrmstrainingparticipant.module').then(m => m.hrmstrainingparticipantModule) },
{ path: 'hrmstrainingschedules', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmstrainingschedule/hrmstrainingschedule.module').then(m => m.hrmstrainingscheduleModule) },

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

