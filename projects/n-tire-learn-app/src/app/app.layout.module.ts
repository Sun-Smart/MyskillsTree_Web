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
                    { path: 'umsanswers', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umsanswer/umsanswer.module').then(m => m.umsanswerModule) },
{ path: 'umsattendances', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umsattendance/umsattendance.module').then(m => m.umsattendanceModule) },
{ path: 'umscoursesemesters', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umscoursesemester/umscoursesemester.module').then(m => m.umscoursesemesterModule) },
{ path: 'umsexamtopics', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umsexamtopic/umsexamtopic.module').then(m => m.umsexamtopicModule) },
{ path: 'umsfeedbackratings', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umsfeedbackrating/umsfeedbackrating.module').then(m => m.umsfeedbackratingModule) },
{ path: 'umsfeestructuredetails', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umsfeestructuredetail/umsfeestructuredetail.module').then(m => m.umsfeestructuredetailModule) },
{ path: 'umsinstructorskills', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umsinstructorskill/umsinstructorskill.module').then(m => m.umsinstructorskillModule) },
{ path: 'umssectionstudents', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umssectionstudent/umssectionstudent.module').then(m => m.umssectionstudentModule) },
{ path: 'umssemestertopics', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umssemestertopic/umssemestertopic.module').then(m => m.umssemestertopicModule) },
{ path: 'umsstudentcourses', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umsstudentcourse/umsstudentcourse.module').then(m => m.umsstudentcourseModule) },
{ path: 'umsstudentfeemasters', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umsstudentfeemaster/umsstudentfeemaster.module').then(m => m.umsstudentfeemasterModule) },
{ path: 'umsstudentmarks', loadChildren: () => import('../../../n-tire-learn-app/src/app/pages/forms/umsstudentmark/umsstudentmark.module').then(m => m.umsstudentmarkModule) },

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

