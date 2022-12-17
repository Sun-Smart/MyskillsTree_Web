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


                    {path: 'dmsarchives',loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsarchive/dmsarchive.module').then(m => m.dmsarchiveModule)},
                    {path: 'dmsconfigs',loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsconfig/dmsconfig.module').then(m => m.dmsconfigModule)},
                    {path: 'dmsdocuments',loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsdocument/dmsdocument.module').then(m => m.dmsdocumentModule)},
                    {path: 'dmsfolders',loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsfolder/dmsfolder.module').then(m => m.dmsfolderModule)},
                    {path: 'dmsmimetypes',loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsmimetype/dmsmimetype.module').then(m => m.dmsmimetypeModule)},
                    {path: 'dmssearches',loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmssearch/dmssearch.module').then(m => m.dmssearchModule)},
                    {path: 'dmsuploads',loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsupload/dmsupload.module').then(m => m.dmsuploadModule)},
                    {path: 'docviewers',loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/docviewer/docviewer.module').then(m => m.docviewerModule)},

                    { path: 'dmsarchiverestorerequests', loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsarchiverestorerequest/dmsarchiverestorerequest.module').then(m => m.dmsarchiverestorerequestModule) },
                    { path: 'dmsaudittrails', loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsaudittrail/dmsaudittrail.module').then(m => m.dmsaudittrailModule) },
                    { path: 'dmsdocumentfields', loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsdocumentfield/dmsdocumentfield.module').then(m => m.dmsdocumentfieldModule) },
                    { path: 'dmsdownloadqueues', loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmsdownloadqueue/dmsdownloadqueue.module').then(m => m.dmsdownloadqueueModule) },
                    { path: 'dmslinkeddocuments', loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmslinkeddocument/dmslinkeddocument.module').then(m => m.dmslinkeddocumentModule) },
                    { path: 'dmslinkedfolders', loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmslinkedfolder/dmslinkedfolder.module').then(m => m.dmslinkedfolderModule) },
                    { path: 'dmslinks', loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmslink/dmslink.module').then(m => m.dmslinkModule) },
                    { path: 'dmssubscriptions', loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/dmssubscription/dmssubscription.module').then(m => m.dmssubscriptionModule) },      
                    { path: 'reclinkedrecords', loadChildren: () => import('../../../n-tire-dms-app/src/app/pages/forms/reclinkedrecord/reclinkedrecord.module').then(m => m.reclinkedrecordModule) },
              
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

      //  NgCommonModule,
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

