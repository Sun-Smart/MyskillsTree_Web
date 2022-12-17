//import { NgCommonModule } from './appcommon.module';
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
                    { path: 'camsassetdisposalplans', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetdisposalplan/camsassetdisposalplan.module').then(m => m.camsassetdisposalplanModule) },

                    { path: 'showdashboard/:id', component: showdashboardComponent },
                    { path: 'bodashboardviewer/bodashboardviewer/:id', component: showdashboardComponent },
                    { path: 'calendar/:id', component: CalendarFormComponent },

                    { path: 'boreportviewer', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk/:fkname1/:fk1', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/view/:id/:pk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },

                    { path: 'camsassetadditions', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetaddition/camsassetaddition.module').then(m => m.camsassetadditionModule) },
                    { path: 'camsassetdisposals', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetdisposal/camsassetdisposal.module').then(m => m.camsassetdisposalModule) },
                    { path: 'camsassetgroups', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetgroup/camsassetgroup.module').then(m => m.camsassetgroupModule) },
                    { path: 'camsassetmasters', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetmaster/camsassetmaster.module').then(m => m.camsassetmasterModule) },
                    { path: 'camsassetreadinghistories', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetreadinghistory/camsassetreadinghistory.module').then(m => m.camsassetreadinghistoryModule) },
                    { path: 'camsassetreadings', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetreading/camsassetreading.module').then(m => m.camsassetreadingModule) },
                    { path: 'camsassettransfers', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassettransfer/camsassettransfer.module').then(m => m.camsassettransferModule) },
                    { path: 'camspmmasters', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmmaster/camspmmaster.module').then(m => m.camspmmasterModule) },
                    { path: 'camspmschedules', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmschedule/camspmschedule.module').then(m => m.camspmscheduleModule) },
                    { path: 'camsworkdetails', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkdetail/camsworkdetail.module').then(m => m.camsworkdetailModule) },
                    { path: 'camsworkorders', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkorder/camsworkorder.module').then(m => m.camsworkorderModule) },
                    { path: 'camsworkrequests', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkrequest/camsworkrequest.module').then(m => m.camsworkrequestModule) },

                    { path: 'camsassetcosts', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetcost/camsassetcost.module').then(m => m.camsassetcostModule) },
{ path: 'camsmisccosts', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsmisccost/camsmisccost.module').then(m => m.camsmisccostModule) },
{ path: 'camspminstructions', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspminstruction/camspminstruction.module').then(m => m.camspminstructionModule) },
{ path: 'camspmitems', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmitem/camspmitem.module').then(m => m.camspmitemModule) },
{ path: 'camspmscheduleinstructions', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmscheduleinstruction/camspmscheduleinstruction.module').then(m => m.camspmscheduleinstructionModule) },
{ path: 'camspmscheduleitems', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmscheduleitem/camspmscheduleitem.module').then(m => m.camspmscheduleitemModule) },
{ path: 'camspmschedulesuppliertasks', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmschedulesuppliertask/camspmschedulesuppliertask.module').then(m => m.camspmschedulesuppliertaskModule) },
{ path: 'camspmscheduletasks', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmscheduletask/camspmscheduletask.module').then(m => m.camspmscheduletaskModule) },
{ path: 'camspmscheduleusers', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmscheduleuser/camspmscheduleuser.module').then(m => m.camspmscheduleuserModule) },
{ path: 'camspmsuppliertasks', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmsuppliertask/camspmsuppliertask.module').then(m => m.camspmsuppliertaskModule) },
{ path: 'camspmusers', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmuser/camspmuser.module').then(m => m.camspmuserModule) },
{ path: 'camsworkinstructions', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkinstruction/camsworkinstruction.module').then(m => m.camsworkinstructionModule) },
{ path: 'camsworkitems', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkitem/camsworkitem.module').then(m => m.camsworkitemModule) },
{ path: 'camsworkreadings', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkreading/camsworkreading.module').then(m => m.camsworkreadingModule) },

{ path: 'camsworkreadings', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkreading/camsworkreading.module').then(m => m.camsworkreadingModule) },
{ path: 'camspmscheduleinstructions', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmscheduleinstruction/camspmscheduleinstruction.module').then(m => m.camspmscheduleinstructionModule) },
{ path: 'camspmscheduleitems', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmscheduleitem/camspmscheduleitem.module').then(m => m.camspmscheduleitemModule) },
{ path: 'camsassetreadinghistories', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetreadinghistory/camsassetreadinghistory.module').then(m => m.camsassetreadinghistoryModule) },
{ path: 'camsassetadditions', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetaddition/camsassetaddition.module').then(m => m.camsassetadditionModule) },
{ path: 'camspmitems', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmitem/camspmitem.module').then(m => m.camspmitemModule) },
{ path: 'camsassetgroups', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetgroup/camsassetgroup.module').then(m => m.camsassetgroupModule) },
{ path: 'camsassetdisposals', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetdisposal/camsassetdisposal.module').then(m => m.camsassetdisposalModule) },
{ path: 'camsassetreadings', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetreading/camsassetreading.module').then(m => m.camsassetreadingModule) },
{ path: 'camsassettransfers', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassettransfer/camsassettransfer.module').then(m => m.camsassettransferModule) },
{ path: 'camspmmasters', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmmaster/camspmmaster.module').then(m => m.camspmmasterModule) },
{ path: 'camsworktimelogs', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworktimelog/camsworktimelog.module').then(m => m.camsworktimelogModule) },
{ path: 'camsworkdetails', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkdetail/camsworkdetail.module').then(m => m.camsworkdetailModule) },
{ path: 'camsworkrequests', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkrequest/camsworkrequest.module').then(m => m.camsworkrequestModule) },
{ path: 'camsworkinstructions', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkinstruction/camsworkinstruction.module').then(m => m.camsworkinstructionModule) },
{ path: 'camsmisccosts', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsmisccost/camsmisccost.module').then(m => m.camsmisccostModule) },
{ path: 'camspmscheduletasks', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmscheduletask/camspmscheduletask.module').then(m => m.camspmscheduletaskModule) },
{ path: 'camsworkitems', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkitem/camsworkitem.module').then(m => m.camsworkitemModule) },
{ path: 'camspmtasks', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmtask/camspmtask.module').then(m => m.camspmtaskModule) },
{ path: 'camspmschedules', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmschedule/camspmschedule.module').then(m => m.camspmscheduleModule) },
{ path: 'camsworkorders', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkorder/camsworkorder.module').then(m => m.camsworkorderModule) },
{ path: 'camspminstructions', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspminstruction/camspminstruction.module').then(m => m.camspminstructionModule) },

{ path: 'camspmsuppliertasks', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmsuppliertask/camspmsuppliertask.module').then(m => m.camspmsuppliertaskModule) },
{ path: 'camsassetcosts', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetcost/camsassetcost.module').then(m => m.camsassetcostModule) },
{ path: 'camsdepreciationschedules', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsdepreciationschedule/camsdepreciationschedule.module').then(m => m.camsdepreciationscheduleModule) },
{ path: 'camsassetmasters', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsassetmaster/camsassetmaster.module').then(m => m.camsassetmasterModule) },
{ path: 'camspmschedulesuppliertasks', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmschedulesuppliertask/camspmschedulesuppliertask.module').then(m => m.camspmschedulesuppliertaskModule) },
{ path: 'camspmscheduleusers', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmscheduleuser/camspmscheduleuser.module').then(m => m.camspmscheduleuserModule) },
{ path: 'camspmusers', loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camspmuser/camspmuser.module').then(m => m.camspmuserModule) },

{ path: 'erpcontractordermasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpcontractordermaster/erpcontractordermaster.module').then(m => m.erpcontractordermasterModule) },
{ path: 'erpcontractorderdetails', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpcontractorderdetail/erpcontractorderdetail.module').then(m => m.erpcontractorderdetailModule) },
{ path: 'erpcontractorderterms', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpcontractorderterm/erpcontractorderterm.module').then(m => m.erpcontractordertermModule) },

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

