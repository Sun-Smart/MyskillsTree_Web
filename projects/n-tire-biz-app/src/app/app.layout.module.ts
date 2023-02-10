//import { NgCommonModule } from './appcommon.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CalendarFormComponent } from '../../../n-tire-biz-app/src/app/pages/forms/calendarform/calendarform.component';
import { boganttComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bogantt/bogantt.component';

import { showdashboardComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bodashboardviewer/showdashboard.component';


import { DashboardComponent } from '../../../n-tire-biz-app/src/app/pages/forms/dashboard/dashboard.component';
import { boworkflowdesignComponent } from '../../../n-tire-biz-app/src/app/pages/forms/boworkflowdesign/boworkflowdesign.component';

import { BODashboardViewerComponent } from '../../../n-tire-biz-app/src/app/pages/forms/bodashboardviewer/bodashboardviewer.component';

import { FieldErrorDisplayComponent } from '../../../n-tire-biz-app/src/app/pages/forms/field-error-display/field-error-display.component'

import { CorporateDashboardComponent } from '../../../n-tire-biz-app/src/app/pages/forms/corporate.component';
import { galleryComponent } from '../../../n-tire-biz-app/src/app/pages/forms/gallery.component';
import { NewskillsearchComponent } from './pages/forms/newskillsearch/newskillsearch.component';
import { bofaqComponent } from './pages/forms/bofaq/bofaq.component';
import { bokbmasterComponent } from 'projects/n-tire-bo-app/src/app/pages/forms/bokbmaster/bokbmaster.component';
import { bokbtopicComponent } from './pages/forms/bokbtopic/bokbtopic.component';
import { boforumComponent } from './pages/forms/boforum/boforum.component';


export const ENTRY_COMPONENTS = [];


export const routedComponents = [];


export const paths = [
    {
        path: '',
        children: [

            {//CalendarComponent   //, component: LayoutComponent,
                path: '',
                children: [

                    { path: 'mstsegments', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/mstsegment/mstsegment.module').then(m => m.mstsegmentModule) },
                    { path: 'mstcategories', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/mstcategory/mstcategory.module').then(m => m.mstcategoryModule) },
                    { path: 'mstsubcategories', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/mstsubcategory/mstsubcategory.module').then(m => m.mstsubcategoryModule) },
                    { path: 'bocountries', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bocountry/bocountry.module').then(m => m.bocountryModule) },
                    { path: 'bostates', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bostate/bostate.module').then(m => m.bostateModule) },
                    { path: 'bocities', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bocity/bocity.module').then(m => m.bocityModule) },
                    // { path: 'bocountries', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bocountry/bocountry.module').then(m => m.bocountryModule) },
                    // { path: 'bostates', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bostate/bostate.module').then(m => m.bostateModule) },
                    // { path: 'bocities', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bocity/bocity.module').then(m => m.bocityModule) },
                    { path: 'showdashboard/:id', component: showdashboardComponent },
                    { path: 'bodashboardviewer/bodashboardviewer/:id', component: showdashboardComponent },
                    { path: 'newskillsearch', component: NewskillsearchComponent },
                    { path: 'calendar/:id', component: CalendarFormComponent },
                    { path: 'corporatedashboard', component: CorporateDashboardComponent },
                    { path: 'gallery', component: galleryComponent },
                    { path: 'boreportviewer', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/menu/:menuhide', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'showpopup/:id/module/:modulename/:modulepkcol/menu/:menuhide', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk/:fkname1/:fk1', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/view/:id/:pk', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: "mstprofilecompletionmasters", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstprofilecompletionmaster/mstprofilecompletionmaster.module").then(m => m.mstprofilecompletionmasterModule) },
                    { path: "mstprofileaccessdetails", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstprofileaccessdetail/mstprofileaccessdetail.module").then(m => m.mstprofileaccessdetailModule) },
                    { path: "mstcorporatemasters", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstcorporatemaster/mstcorporatemaster.module").then(m => m.mstcorporatemasterModule) },
                    { path: "mstapplicantmasters", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantmaster/mstapplicantmaster.module").then(m => m.mstapplicantmasterModule) },

                    { path: "boreports", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/boreport/boreport.module").then(m => m.boreportModule) },

                    { path: "mstapplicantworkreferences", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantworkreference/mstapplicantworkreference.module").then(m => m.mstapplicantworkreferenceModule) },
                    { path: "mstapplicantsocialmediadetails", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.module").then(m => m.mstapplicantsocialmediadetailModule) },
                    { path: "mstapplicantskilldetails", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.module").then(m => m.mstapplicantskilldetailModule) },
                    { path: "mstapplicantreferencerequests", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.module").then(m => m.mstapplicantreferencerequestModule) },
                    // { path: "mstapplicantreferencerequestsaccepted", pathMatch: 'prefix', loadChildren: () => import("./pages/mstapplicantreferencerequestsaccepted/mstapplicantreferencerequestsaccepted.module").then(m => m.mstapplicantreferencerequestsacceptedModule) },
                    { path: "mstapplicantreferencedetails", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.module").then(m => m.mstapplicantreferencedetailModule) },
                    { path: "mstapplicantlanguagedetails", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantlanguagedetail/mstapplicantlanguagedetail.module").then(m => m.mstapplicantlanguagedetailModule) },
                    { path: "mstapplicantgeographypreferences", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantgeographypreference/mstapplicantgeographypreference.module").then(m => m.mstapplicantgeographypreferenceModule) },
                    { path: "mstapplicanteducationdetails", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicanteducationdetail/mstapplicanteducationdetail.module").then(m => m.mstapplicanteducationdetailModule) },
                    { path: "mstapplicantcareerdetails", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantcareerdetail/mstapplicantcareerdetail.module").then(m => m.mstapplicantcareerdetailModule) },
                    { path: "mstapplicantachievementdetails", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantachievementdetail/mstapplicantachievementdetail.module").then(m => m.mstapplicantachievementdetailModule) },
                    { path: "bootpvalidationdetails", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/bootpvalidationdetail/bootpvalidationdetail.module").then(m => m.bootpvalidationdetailModule) },

                    { path: "mstcorporatelocations", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstcorporatelocation/mstcorporatelocation.module").then(m => m.mstcorporatelocationModule) },
                    { path: "mstjobrequirements", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.module").then(m => m.mstjobrequirementModule) },
                    { path: "mstjobstatuses", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstjobstatus/mstjobstatus.module").then(m => m.mstjobstatusModule) },
                    //{ path: "mstapplicantachievementdetails", pathMatch: 'prefix',loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstapplicantachievementdetail/mstapplicantachievementdetail.module").then(m => m.mstapplicantachievementdetailModule) },

                    { path: 'bocompanyregistrations', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bocompanyregistration/bocompanyregistration.module').then(m => m.bocompanyregistrationModule) },
                    // { path: 'applicantregister', pathMatch: 'prefix', loadChildren: () => import('./pages/applicantregister/applicantregister.module').then(m => m.ApplicantregisterModule) },

                    { path: 'bouserregistrations', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bouserregistration/bouserregistration.module').then(m => m.bouserregistrationModule) },

                    { path: 'bocompanymasters', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bocompanymaster/bocompanymaster.module').then(m => m.bocompanymasterModule) },
                    { path: 'bocompanysettings', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bocompanysetting/bocompanysetting.module').then(m => m.bocompanysettingModule) },
                    { path: 'boconfigvalues', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boconfigvalue/boconfigvalue.module').then(m => m.boconfigvalueModule) },
                    { path: 'bofinancialyears', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bofinancialyear/bofinancialyear.module').then(m => m.bofinancialyearModule) },
                    { path: 'bosubcategorymasters', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bosubcategorymaster/bosubcategorymaster.module').then(m => m.bosubcategorymasterModule) },
                    { path: 'botemplates', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/botemplate/botemplate.module').then(m => m.botemplateModule) },
                    { path: 'bodashboards', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bodashboard/bodashboard.module').then(m => m.bodashboardModule) },
                    { path: 'bodashboardviewer/bodashboardviewer/:id', component: showdashboardComponent },
                    { path: 'bomasterdatas', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bomasterdata/bomasterdata.module').then(m => m.bomasterdataModule) },
                    { path: 'bomasterdatatypes', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bomasterdatatype/bomasterdatatype.module').then(m => m.bomasterdatatypeModule) },
                    { path: 'bousergroups', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bousergroup/bousergroup.module').then(m => m.bousergroupModule) },
                    { path: 'bousermasters', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bousermaster/bousermaster.module').then(m => m.bousermasterModule) },
                    { path: 'bouserrolemasters', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.module').then(m => m.bouserrolemasterModule) },
                    { path: 'boworkflowmasters', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boworkflowmaster/boworkflowmaster.module').then(m => m.boworkflowmasterModule) },
                    { path: 'boworkflows', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boworkflow/boworkflow.module').then(m => m.boworkflowModule) },
                    { path: 'bousergroupaccesses', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bousergroupaccess/bousergroupaccess.module').then(m => m.bousergroupaccessModule) },
                    { path: 'bomenumasters', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bomenumaster/bomenumaster.module').then(m => m.bomenumasterModule) },
                    { path: 'bomenuactions', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bomenuaction/bomenuaction.module').then(m => m.bomenuactionModule) },
                    { path: 'bousermenuaccesses', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bousermenuaccess/bousermenuaccess.module').then(m => m.bousermenuaccessModule) },
                    //{ path: 'bousers', pathMatch: 'prefix',loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bouser/bouser.module').then(m => m.bouserModule) },
                    { path: 'bousertypemenuaccesses', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bousertypemenuaccess/bousertypemenuaccess.module').then(m => m.bousertypemenuaccessModule) },
                    { path: 'bodashboardviewer', pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/bodashboardviewer/bodashboardviewer.module").then(m => m.bodashboardviewerModule) },
                    { path: 'applicantdashboard', pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/applicantdashboard/applicantdashboard.module").then(m => m.applicantdashboardModule) },
                    { path: 'hlpticketdetails', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/hlpticketdetail/hlpticketdetail.module').then(m => m.hlpticketdetailModule) },
                    //code added by dhana dec-15
                    // { path: 'newskillsearch',  loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/newskillsearch/newskillsearch.module").then(m => m.NewskillsearchModule) },

                    //added by dhana march-21
                    { path: "mstterms", pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstterm/mstterm.module").then(m => m.msttermModule) },
                    //added by dhana mar-11
                    // { path: 'mstterm', pathMatch: 'prefix', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/mstterm/mstterm.module").then(m => m.msttermModule) },

                    { path: 'hlptickets', loadChildren: () => import("../../../n-tire-biz-app/src/app/pages/forms/hlpticket/hlpticket.module").then(m => m.hlpticketModule) },


                    { path: 'lmsassigns', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsassign/lmsassign.module').then(m => m.lmsassignModule) },
                    { path: 'lmscalls', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmscall/lmscall.module').then(m => m.lmscallModule) },
                    { path: 'lmscampaignmasters', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmscampaignmaster/lmscampaignmaster.module').then(m => m.lmscampaignmasterModule) },
                    { path: 'lmscampaigntasks', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmscampaigntask/lmscampaigntask.module').then(m => m.lmscampaigntaskModule) },
                    { path: 'lmscorporatesecondarycontacts', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.module').then(m => m.lmscorporatesecondarycontactModule) },
                    { path: 'lmsmasters', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsmaster/lmsmaster.module').then(m => m.lmsmasterModule) },
                    { path: 'lmsopportunities', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsopportunity/lmsopportunity.module').then(m => m.lmsopportunityModule) },
                    { path: 'lmsproductmasters', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsproductmaster/lmsproductmaster.module').then(m => m.lmsproductmasterModule) },
                    { path: 'lmsresponses', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsresponse/lmsresponse.module').then(m => m.lmsresponseModule) },
                    //{ path: 'lmsscoringfixedfieldsnegatives', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsscoringfixedfieldsnegative/lmsscoringfixedfieldsnegative.module').then(m => m.lmsscoringfixedfieldsnegativeModule) },
                    //{ path: 'lmsscoringfixedfieldspositives', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsscoringfixedfieldspositive/lmsscoringfixedfieldspositive.module').then(m => m.lmsscoringfixedfieldspositiveModule) },
                    //{ path: 'lmsscoringplannedclosedates', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsscoringplannedclosedate/lmsscoringplannedclosedate.module').then(m => m.lmsscoringplannedclosedateModule) },
                    //{ path: 'lmstargetbranchlevels', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmstargetbranchlevel/lmstargetbranchlevel.module').then(m => m.lmstargetbranchlevelModule) },
                    //{ path: 'lmstargetorglevels', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmstargetorglevel/lmstargetorglevel.module').then(m => m.lmstargetorglevelModule) },
                    //{ path: 'lmstargetuserlevels', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmstargetuserlevel/lmstargetuserlevel.module').then(m => m.lmstargetuserlevelModule) },
                    { path: 'lmstasks', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmstask/lmstask.module').then(m => m.lmstaskModule) },


                    { path: 'crmcustomeraccountmasters', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/crmcustomeraccountmaster/crmcustomeraccountmaster.module').then(m => m.crmcustomeraccountmasterModule) },
                    { path: 'crmcustomermasters', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.module').then(m => m.crmcustomermasterModule) },
                    { path: 'crmcustomerservices', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/crmcustomerservice/crmcustomerservice.module').then(m => m.crmcustomerserviceModule) },
                    { path: 'crmindexmasters', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/crmindexmaster/crmindexmaster.module').then(m => m.crmindexmasterModule) },
                    //{ path: 'crmtickets', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/crmticket/crmticket.module').then(m => m.crmticketModule) },
                    { path: 'crmcustomeraccounttransactions', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/crmcustomeraccounttransaction/crmcustomeraccounttransaction.module').then(m => m.crmcustomeraccounttransactionModule) },
                    { path: 'crmcustomerkycmasters', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/crmcustomerkycmaster/crmcustomerkycmaster.module').then(m => m.crmcustomerkycmasterModule) },
                    { path: 'crmindexdetails', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/crmindexdetail/crmindexdetail.module').then(m => m.crmindexdetailModule) },
                    { path: 'lmsbundledproducts', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsbundledproduct/lmsbundledproduct.module').then(m => m.lmsbundledproductModule) },
                    { path: 'lmscampaignlocations', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmscampaignlocation/lmscampaignlocation.module').then(m => m.lmscampaignlocationModule) },
                    { path: 'lmscampaignnoaccesses', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmscampaignnoaccess/lmscampaignnoaccess.module').then(m => m.lmscampaignnoaccessModule) },
                    { path: 'lmscampaigntaskresponses', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmscampaigntaskresponse/lmscampaigntaskresponse.module').then(m => m.lmscampaigntaskresponseModule) },
                    { path: 'lmshistories', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmshistory/lmshistory.module').then(m => m.lmshistoryModule) },
                    { path: 'lmsopportunityproducts', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsopportunityproduct/lmsopportunityproduct.module').then(m => m.lmsopportunityproductModule) },
                    { path: 'lmsquotedetails', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsquotedetail/lmsquotedetail.module').then(m => m.lmsquotedetailModule) },
                    { path: 'lmsreminders', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmsreminder/lmsreminder.module').then(m => m.lmsreminderModule) },
                    { path: 'lmssecondarycontacts', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmssecondarycontact/lmssecondarycontact.module').then(m => m.lmssecondarycontactModule) },
                    { path: 'lmssubresponses', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmssubresponse/lmssubresponse.module').then(m => m.lmssubresponseModule) },
                    { path: 'lmstaskresponses', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/lmstaskresponse/lmstaskresponse.module').then(m => m.lmstaskresponseModule) },
                    { path: 'boexpenses', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boexpense/boexpense.module').then(m => m.boexpenseModule) },



                    // New Knowlwdge Base implementation 10/02/2023

                    { path: 'bofaq', component: bofaqComponent },
                    { path: 'bokbmaster', component: bokbmasterComponent },
                    { path: 'bokbtopic', component: bokbtopicComponent },
                    { path: 'boforum', component: boforumComponent },

                    // { path: 'bofaq', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bofaq/bofaq.module').then(m => m.BofaqModule) },
                    // { path: 'bokbmaster', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bokbmaster/bokbmaster.module').then(m => m.BokbmasterModule) },
                    // { path: 'bokbtopic', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/bokbtopic/bokbtopic.module').then(m => m.BokbtopicModule) },
                    // { path: 'boforum', pathMatch: 'prefix', loadChildren: () => import('../../../n-tire-biz-app/src/app/pages/forms/boforum/boforum.module').then(m => m.BoforumModule) },

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

