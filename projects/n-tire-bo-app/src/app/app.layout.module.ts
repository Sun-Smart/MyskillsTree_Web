import { NgCommonModule } from '../../../n-tire-bo-app/src/app/appcommon.module';
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
                    { path: 'automasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/automaster/automaster.module').then(m => m.automasterModule) },
                    { path: 'boactivities', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boactivity/boactivity.module').then(m => m.boactivityModule) },
                    { path: 'bobranchmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.module').then(m => m.bobranchmasterModule) },
                    { path: 'bocalls', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocall/bocall.module').then(m => m.bocallModule) },
                    { path: 'bocities', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.module').then(m => m.bocityModule) },
                    { path: 'bocompanybankdetails', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocompanybankdetail/bocompanybankdetail.module').then(m => m.bocompanybankdetailModule) },
                    { path: 'bocompanymasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocompanymaster/bocompanymaster.module').then(m => m.bocompanymasterModule) },
                    { path: 'bocompanysettings', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocompanysetting/bocompanysetting.module').then(m => m.bocompanysettingModule) },
                    { path: 'boconfigvalues', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boconfigvalue/boconfigvalue.module').then(m => m.boconfigvalueModule) },
                    { path: 'bocontacts', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocontact/bocontact.module').then(m => m.bocontactModule) },
                    { path: 'bocountries', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.module').then(m => m.bocountryModule) },
                    { path: 'bodashboards', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodashboard/bodashboard.module').then(m => m.bodashboardModule) },
                    { path: 'bodashboardviewer/bodashboardviewer/:id', component: showdashboardComponent },
                    { path: 'bodatamaskings', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodatamasking/bodatamasking.module').then(m => m.bodatamaskingModule) },
                    { path: 'bodocuments', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodocument/bodocument.module').then(m => m.bodocumentModule) },
                    { path: 'bodynamicforms', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodynamicform/bodynamicform.module').then(m => m.bodynamicformModule) },
                    { path: 'bodynamicformviewers', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodynamicformviewer/bodynamicformviewer.module').then(m => m.bodynamicformviewerModule) },
                    { path: 'boemails', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boemail/boemail.module').then(m => m.boemailModule) },
                    { path: 'boexpenses', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boexpense/boexpense.module').then(m => m.boexpenseModule) },
                    { path: 'bofacts', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bofact/bofact.module').then(m => m.bofactModule) },
                    { path: 'bofaqs', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bofaq/bofaq.module').then(m => m.bofaqModule) },
                    { path: 'bogantts/:id', component: boganttComponent },
                    { path: 'boholidaylists', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boholidaylist/boholidaylist.module').then(m => m.boholidaylistModule) },
                    { path: 'bokbmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bokbmaster/bokbmaster.module').then(m => m.bokbmasterModule) },
                    { path: 'bolmsbranchmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bolmsbranchmaster/bolmsbranchmaster.module').then(m => m.bolmsbranchmasterModule) },
                    { path: 'bomasterdatas', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.module').then(m => m.bomasterdataModule) },
                    { path: 'bomasterdatatypes', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomasterdatatype/bomasterdatatype.module').then(m => m.bomasterdatatypeModule) },
                    { path: 'bomeetings', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomeeting/bomeeting.module').then(m => m.bomeetingModule) },
                    { path: 'bomenumasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomenumaster/bomenumaster.module').then(m => m.bomenumasterModule) },
                    { path: 'bomodulehelps', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomodulehelp/bomodulehelp.module').then(m => m.bomodulehelpModule) },
                    { path: 'bonotificationsettings', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bonotificationsetting/bonotificationsetting.module').then(m => m.bonotificationsettingModule) },
                    { path: 'boprocessmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boprocessmaster/boprocessmaster.module').then(m => m.boprocessmasterModule) },
                    { path: 'boprocesstasks', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boprocesstask/boprocesstask.module').then(m => m.boprocesstaskModule) },
                    { path: 'boremindermasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boremindermaster/boremindermaster.module').then(m => m.boremindermasterModule) },
                    { path: 'boreports', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreport/boreport.module').then(m => m.boreportModule) },
                    { path: 'boreportviewer', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk/:fkname1/:fk1', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/view/:id/:pk', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boserialkeyparameters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boserialkeyparameter/boserialkeyparameter.module').then(m => m.boserialkeyparameterModule) },
                    { path: 'bostates', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.module').then(m => m.bostateModule) },
                    { path: 'botableconfigurations', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/botableconfiguration/botableconfiguration.module').then(m => m.botableconfigurationModule) },
                    { path: 'botables', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/botable/botable.module').then(m => m.botableModule) },
                    { path: 'boteams', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boteam/boteam.module').then(m => m.boteamModule) },
                    { path: 'botemplates', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/botemplate/botemplate.module').then(m => m.botemplateModule) },
                    { path: 'bousergroups', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bousergroup/bousergroup.module').then(m => m.bousergroupModule) },
                    { path: 'bousermasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.module').then(m => m.bousermasterModule) },
                    { path: 'bouserrolemasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.module').then(m => m.bouserrolemasterModule) },
                    { path: 'boworkflowmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boworkflowmaster/boworkflowmaster.module').then(m => m.boworkflowmasterModule) },
                    { path: 'boworkflows', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boworkflow/boworkflow.module').then(m => m.boworkflowModule) },
                    { path: 'calendar/:id', component: CalendarFormComponent },

                    { path: 'autodetails', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/autodetail/autodetail.module').then(m => m.autodetailModule) },
{ path: 'boauditevents', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boauditevents/boauditevents.module').then(m => m.boauditeventsModule) },
{ path: 'bocallinvitees', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocallinvite/bocallinvite.module').then(m => m.bocallinviteModule) },
{ path: 'bocallreminders', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocallreminder/bocallreminder.module').then(m => m.bocallreminderModule) },
{ path: 'bocompanyholidays', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocompanyholiday/bocompanyholiday.module').then(m => m.bocompanyholidayModule) },
{ path: 'bodashboarddetails', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodashboarddetail/bodashboarddetail.module').then(m => m.bodashboarddetailModule) },
{ path: 'bodatamaskingrolerestricts', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodatamaskingrolerestrict/bodatamaskingrolerestrict.module').then(m => m.bodatamaskingrolerestrictModule) },
{ path: 'bodynamicformdetails', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodynamicformdetail/bodynamicformdetail.module').then(m => m.bodynamicformdetailModule) },
{ path: 'bofinancialyears', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bofinancialyear/bofinancialyear.module').then(m => m.bofinancialyearModule) },
{ path: 'bokbaccesses', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bokbaccess/bokbaccess.module').then(m => m.bokbaccessModule) },
{ path: 'bokbtopics', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bokbtopic/bokbtopic.module').then(m => m.bokbtopicModule) },
{ path: 'bomeetinginvitees', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomeetinginvite/bomeetinginvite.module').then(m => m.bomeetinginviteModule) },
{ path: 'bomeetingreminders', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomeetingreminder/bomeetingreminder.module').then(m => m.bomeetingreminderModule) },
{ path: 'bomenuactions', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomenuaction/bomenuaction.module').then(m => m.bomenuactionModule) },
{ path: 'boprocesstaskforms', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boprocesstaskform/boprocesstaskform.module').then(m => m.boprocesstaskformModule) },
{ path: 'boreminderusers', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreminderuser/boreminderuser.module').then(m => m.boreminderuserModule) },
{ path: 'boreportdetails', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportdetail/boreportdetail.module').then(m => m.boreportdetailModule) },
{ path: 'boreportothertables', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportothertable/boreportothertable.module').then(m => m.boreportothertableModule) },
{ path: 'bosecurityquestions', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bosecurityquestion/bosecurityquestion.module').then(m => m.bosecurityquestionModule) },
{ path: 'bosubcategorymasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.module').then(m => m.bosubcategorymasterModule) },
{ path: 'bousergroupaccesses', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bousergroupaccess/bousergroupaccess.module').then(m => m.bousergroupaccessModule) },
{ path: 'bousermenuaccesses', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bousermenuaccess/bousermenuaccess.module').then(m => m.bousermenuaccessModule) },
{ path: 'bousers', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bouser/bouser.module').then(m => m.bouserModule) },
{ path: 'bousertypemenuaccesses', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bousertypemenuaccess/bousertypemenuaccess.module').then(m => m.bousertypemenuaccessModule) },


{ path: 'camsworkrequests',  loadChildren: () => import('../../../n-tire-cams-app/src/app/pages/forms/camsworkrequest/camsworkrequest.module').then(m => m.camsworkrequestModule) },


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

        NgCommonModule,
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

