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
                    { path: 'calendar/:id', component: CalendarFormComponent },
                    { path: 'showdashboard/:id', component: showdashboardComponent },
                    { path: 'bodashboardviewer/bodashboardviewer/:id', component: showdashboardComponent },
                    { path: 'boreportviewer', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk/:fkname1/:fk1', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/view/:id/:pk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },


                    { path: 'pmsleases', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmslease/pmslease.module').then(m => m.pmsleaseModule) },
                    { path: 'pmsproperties', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmsproperty/pmsproperty.module').then(m => m.pmspropertyModule) },
                    { path: 'pmspropertyinsurances', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmspropertyinsurance/pmspropertyinsurance.module').then(m => m.pmspropertyinsuranceModule) },
                    { path: 'pmspropertyowners', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmspropertyowner/pmspropertyowner.module').then(m => m.pmspropertyownerModule) },
                    { path: 'pmsschedules', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmsschedule/pmsschedule.module').then(m => m.pmsscheduleModule) },
                    { path: 'pmstenants', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmstenant/pmstenant.module').then(m => m.pmstenantModule) },
                    { path: 'pmsworkorders', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmsworkorder/pmsworkorder.module').then(m => m.pmsworkorderModule) },

                    { path: 'pmsdeposits', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmsdeposit/pmsdeposit.module').then(m => m.pmsdepositModule) },
                    { path: 'pmsworkorderdetails', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmsworkorderdetail/pmsworkorderdetail.module').then(m => m.pmsworkorderdetailModule) },
                    { path: 'pmskycdetails', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmskycdetail/pmskycdetail.module').then(m => m.pmskycdetailModule) },
                    { path: 'pmsownerkycdetails', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmsownerkycdetail/pmsownerkycdetail.module').then(m => m.pmsownerkycdetailModule) },
                    { path: 'pmspropertyopexdetails', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmspropertyopexdetail/pmspropertyopexdetail.module').then(m => m.pmspropertyopexdetailModule) },
                    { path: 'pmspdcs', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmspdc/pmspdc.module').then(m => m.pmspdcModule) },
                    { path: 'pmspropertyassets', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmspropertyasset/pmspropertyasset.module').then(m => m.pmspropertyassetModule) },
                    { path: 'pmspropertycontacts', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmspropertycontact/pmspropertycontact.module').then(m => m.pmspropertycontactModule) },
                    { path: 'pmspropertydocuments', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmspropertydocument/pmspropertydocument.module').then(m => m.pmspropertydocumentModule) },
                    { path: 'pmspropertyimages', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmspropertyimage/pmspropertyimage.module').then(m => m.pmspropertyimageModule) },
                    { path: 'pmstransactionschedules', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmstransactionschedule/pmstransactionschedule.module').then(m => m.pmstransactionscheduleModule) },
                    { path: 'pmspropertyunitowners', loadChildren: () => import('../../../n-tire-property-app/src/app/pages/forms/pmspropertyunitowner/pmspropertyunitowner.module').then(m => m.pmspropertyunitownerModule) },
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

