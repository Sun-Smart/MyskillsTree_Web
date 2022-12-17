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
                    { path: 'boreportviewer', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk/:fkname1/:fk1', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/view/:id/:pk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },


                    { path: 'vmsemployeeparcels', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsemployeeparcel/vmsemployeeparcel.module').then(m => m.vmsemployeeparcelModule) },
                    { path: 'vmsevents', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsevent/vmsevent.module').then(m => m.vmseventModule) },
                    { path: 'vmsinvitations', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsinvitation/vmsinvitation.module').then(m => m.vmsinvitationModule) },
                    { path: 'vmsparkings', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsparking/vmsparking.module').then(m => m.vmsparkingModule) },
                    { path: 'vmssettings', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmssetting/vmssetting.module').then(m => m.vmssettingModule) },
                    { path: 'vmsvisitors', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsvisitor/vmsvisitor.module').then(m => m.vmsvisitorModule) },
                    { path: 'vmsvisitormasters', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsvisitormaster/vmsvisitormaster.module').then(m => m.vmsvisitormasterModule) },
                    { path: 'vmsworkplacebookings', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsworkplacebooking/vmsworkplacebooking.module').then(m => m.vmsworkplacebookingModule) },
                    { path: 'vmsworkplacerequests', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsworkplacerequest/vmsworkplacerequest.module').then(m => m.vmsworkplacerequestModule) },
                    { path: 'vmsworkplaces', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsworkplace/vmsworkplace.module').then(m => m.vmsworkplaceModule) },
                    { path: 'vmsinvitepersons', loadChildren: () => import('../../../n-tire-visitor-app/src/app/pages/forms/vmsinviteperson/vmsinviteperson.module').then(m => m.vmsinvitepersonModule) },

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

