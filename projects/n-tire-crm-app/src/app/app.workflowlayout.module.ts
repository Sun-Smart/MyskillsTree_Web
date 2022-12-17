import { NgCommonModule } from './appcommon.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {paths} from './app.layout.module';


/*
export const paths = [
    {
        path: '',
        children: [

            {
                path: '',
                children: [

                    { path: 'crmtatconfigurations', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/crmtatconfiguration/crmtatconfiguration.module').then(m => m.crmtatconfigurationModule) },


                    { path: 'erppurchaserequests', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erppurchaserequest/erppurchaserequest.module').then(m => m.erppurchaserequestModule) },
                    { path: 'hrmsleaverequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsleaverequest/hrmsleaverequest.module').then(m => m.hrmsleaverequestModule) },
                    { path: 'hrmsletterrequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsletterrequest/hrmsletterrequest.module').then(m => m.hrmsletterrequestModule) },

                    { path: 'automasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/automaster/automaster.module').then(m => m.automasterModule) },
                    { path: 'bobranchmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bobranchmaster/bobranchmaster.module').then(m => m.bobranchmasterModule) },
                    { path: 'bolmsbranchmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bolmsbranchmaster/bolmsbranchmaster.module').then(m => m.bolmsbranchmasterModule) },
                    { path: 'bocities', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocity/bocity.module').then(m => m.bocityModule) },
                    { path: 'bocompanybankdetails', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocompanybankdetail/bocompanybankdetail.module').then(m => m.bocompanybankdetailModule) },
                    { path: 'bocompanymasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocompanymaster/bocompanymaster.module').then(m => m.bocompanymasterModule) },
                    { path: 'boconfigvalues', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boconfigvalue/boconfigvalue.module').then(m => m.boconfigvalueModule) },
                    { path: 'bocountries', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocountry/bocountry.module').then(m => m.bocountryModule) },
                    { path: 'boserialkeyparameters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boserialkeyparameter/boserialkeyparameter.module').then(m => m.boserialkeyparameterModule) },
                    { path: 'bocompanysettings', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bocompanysetting/bocompanysetting.module').then(m => m.bocompanysettingModule) },
                    { path: 'bodashboards', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodashboard/bodashboard.module').then(m => m.bodashboardModule) },


                    { path: 'bodynamicforms', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodynamicform/bodynamicform.module').then(m => m.bodynamicformModule) },
                    { path: 'bodynamicformviewers', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodynamicformviewer/bodynamicformviewer.module').then(m => m.bodynamicformviewerModule) },
                    { path: 'bokbmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bokbmaster/bokbmaster.module').then(m => m.bokbmasterModule) },
                    { path: 'bomasterdatas', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomasterdata/bomasterdata.module').then(m => m.bomasterdataModule) },
                    { path: 'bomasterdatatypes', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomasterdatatype/bomasterdatatype.module').then(m => m.bomasterdatatypeModule) },
                    { path: 'bomenumasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bomenumaster/bomenumaster.module').then(m => m.bomenumasterModule) },
                    { path: 'bonotificationsettings', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bonotificationsetting/bonotificationsetting.module').then(m => m.bonotificationsettingModule) },
                    { path: 'boreports', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreport/boreport.module').then(m => m.boreportModule) },
                    { path: 'boreportviewer', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'bostates', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bostate/bostate.module').then(m => m.bostateModule) },
                    { path: 'botables', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/botable/botable.module').then(m => m.botableModule) },
                    { path: 'botableconfigurations', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/botableconfiguration/botableconfiguration.module').then(m => m.botableconfigurationModule) },
                    { path: 'bousermasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bousermaster/bousermaster.module').then(m => m.bousermasterModule) },
                    { path: 'bouserrolemasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bouserrolemaster/bouserrolemaster.module').then(m => m.bouserrolemasterModule) },
                    { path: 'boworkflowmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boworkflowmaster/boworkflowmaster.module').then(m => m.boworkflowmasterModule) },
                    //project//{ path: 'cobacustomerprocessmasters', loadChildren: () => import('src/app/pages/forms/cobacustomerprocessmaster/cobacustomerprocessmaster.module').then(m => m.cobacustomerprocessmasterModule) },
                    //project//{ path: 'cobaprocessmasters', loadChildren: () => import('src/app/pages/forms/cobaprocessmaster/cobaprocessmaster.module').then(m => m.cobaprocessmasterModule) },
                    { path: 'customfieldconfigurations', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/customfieldconfiguration/customfieldconfiguration.module').then(m => m.customfieldconfigurationModule) },
                    //{path: 'dynamicformbuilders',loadChildren: 'src/app/pages/forms/dynamic-form-builder/dynamic-form-builder.module#DynamicFormBuilderModule'},
                    { path: 'erpbudgetmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpbudgetmaster/erpbudgetmaster.module').then(m => m.erpbudgetmasterModule) },
                    { path: 'erpgoodsreceiptmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpgoodsreceiptmaster/erpgoodsreceiptmaster.module').then(m => m.erpgoodsreceiptmasterModule) },
                    { path: 'erpiltmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpiltmaster/erpiltmaster.module').then(m => m.erpiltmasterModule) },
                    { path: 'erpitemmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpitemmaster/erpitemmaster.module').then(m => m.erpitemmasterModule) },
                    { path: 'erplocationmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erplocationmaster/erplocationmaster.module').then(m => m.erplocationmasterModule) },
                    { path: 'erpmaterialrequests', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpmaterialrequest/erpmaterialrequest.module').then(m => m.erpmaterialrequestModule) },
                    { path: 'erpphysicalinventorymasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpphysicalinventorymaster/erpphysicalinventorymaster.module').then(m => m.erpphysicalinventorymasterModule) },
                    { path: 'erpproductfeatureparameters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpproductfeatureparameter/erpproductfeatureparameter.module').then(m => m.erpproductfeatureparameterModule) },
                    { path: 'erppurchaseorderdetails', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erppurchaseorderdetail/erppurchaseorderdetail.module').then(m => m.erppurchaseorderdetailModule) },
                    { path: 'erppurchaseordermasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erppurchaseordermaster/erppurchaseordermaster.module').then(m => m.erppurchaseordermasterModule) },
                    { path: 'erppurchaserequests', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erppurchaserequest/erppurchaserequest.module').then(m => m.erppurchaserequestModule) },
                    { path: 'erprfqdetails', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erprfqdetail/erprfqdetail.module').then(m => m.erprfqdetailModule) },
                    { path: 'erprfqmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erprfqmaster/erprfqmaster.module').then(m => m.erprfqmasterModule) },
                    { path: 'erpsupplieritems', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpsupplieritem/erpsupplieritem.module').then(m => m.erpsupplieritemModule) },
                    { path: 'erpsuppliermasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpsuppliermaster/erpsuppliermaster.module').then(m => m.erpsuppliermasterModule) },
                    { path: 'erpsupplierpackingdetails', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierpackingdetail/erpsupplierpackingdetail.module').then(m => m.erpsupplierpackingdetailModule) },
                    { path: 'erpsupplierpackingmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierpackingmaster/erpsupplierpackingmaster.module').then(m => m.erpsupplierpackingmasterModule) },
                    { path: 'erpsupplierquotationmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpsupplierquotationmaster/erpsupplierquotationmaster.module').then(m => m.erpsupplierquotationmasterModule) },
                    { path: 'erptaxmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erptaxmaster/erptaxmaster.module').then(m => m.erptaxmasterModule) },
                    { path: 'field-error-displays', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/field-error-display/field-error-display.module').then(m => m.FieldErrorDisplayModule) },
                    { path: 'hrmsadvancerequestmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsadvancerequestmaster/hrmsadvancerequestmaster.module').then(m => m.hrmsadvancerequestmasterModule) },
                    { path: 'hrmsadvertisementmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsadvertisementmaster/hrmsadvertisementmaster.module').then(m => m.hrmsadvertisementmasterModule) },
                    { path: 'hrmsapplicantmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsapplicantmaster/hrmsapplicantmaster.module').then(m => m.hrmsapplicantmasterModule) },
                    { path: 'hrmsbudgetmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsbudgetmaster/hrmsbudgetmaster.module').then(m => m.hrmsbudgetmasterModule) },
                    { path: 'hrmsdependantdetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsdependantdetail/hrmsdependantdetail.module').then(m => m.hrmsdependantdetailModule) },
                    { path: 'hrmsemployees', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.module').then(m => m.hrmsemployeeModule) },
                    { path: 'hrmsemployeecareers', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeecareer/hrmsemployeecareer.module').then(m => m.hrmsemployeecareerModule) },
                    { path: 'hrmsemployeechecklists', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeechecklist/hrmsemployeechecklist.module').then(m => m.hrmsemployeechecklistModule) },
                    { path: 'hrmsemployeechecklistconfigmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeechecklistconfigmaster/hrmsemployeechecklistconfigmaster.module').then(m => m.hrmsemployeechecklistconfigmasterModule) },
                    { path: 'hrmsemployeedocuments', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeedocument/hrmsemployeedocument.module').then(m => m.hrmsemployeedocumentModule) },
                    { path: 'hrmsemployeeeducations', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeeeducation/hrmsemployeeeducation.module').then(m => m.hrmsemployeeeducationModule) },
                    { path: 'hrmsemployeeeosdetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeeeosdetail/hrmsemployeeeosdetail.module').then(m => m.hrmsemployeeeosdetailModule) },
                    { path: 'hrmsemployeegeneralwaivers', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeegeneralwaiver/hrmsemployeegeneralwaiver.module').then(m => m.hrmsemployeegeneralwaiverModule) },
                    { path: 'hrmsemployeeinfrarequestmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeeinfrarequestmaster/hrmsemployeeinfrarequestmaster.module').then(m => m.hrmsemployeeinfrarequestmasterModule) },
                    { path: 'hrmsemployeekras', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeekra/hrmsemployeekra.module').then(m => m.hrmsemployeekraModule) },
                    { path: 'hrmsemployeelanguageskills', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeelanguageskill/hrmsemployeelanguageskill.module').then(m => m.hrmsemployeelanguageskillModule) },
                    { path: 'hrmsemployeelettermanagements', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeelettermanagement/hrmsemployeelettermanagement.module').then(m => m.hrmsemployeelettermanagementModule) },
                    { path: 'hrmsemployeeloanrequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeeloanrequest/hrmsemployeeloanrequest.module').then(m => m.hrmsemployeeloanrequestModule) },
                    { path: 'hrmsemployeemembershipdetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeemembershipdetail/hrmsemployeemembershipdetail.module').then(m => m.hrmsemployeemembershipdetailModule) },
                    { path: 'hrmsemployeememos', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeememo/hrmsemployeememo.module').then(m => m.hrmsemployeememoModule) },
                    { path: 'hrmsemployeemonthlyattendances', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeemonthlyattendance/hrmsemployeemonthlyattendance.module').then(m => m.hrmsemployeemonthlyattendanceModule) },
                    { path: 'hrmsemployeemonthlysalarymasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeemonthlysalarymaster/hrmsemployeemonthlysalarymaster.module').then(m => m.hrmsemployeemonthlysalarymasterModule) },
                    { path: 'hrmsemployeepresentations', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeepresentation/hrmsemployeepresentation.module').then(m => m.hrmsemployeepresentationModule) },
                    { path: 'hrmsemployeereportings', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeereporting/hrmsemployeereporting.module').then(m => m.hrmsemployeereportingModule) },
                    { path: 'hrmsemployeerewards', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeereward/hrmsemployeereward.module').then(m => m.hrmsemployeerewardModule) },
                    { path: 'hrmsemployeesalarymasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeesalarymaster/hrmsemployeesalarymaster.module').then(m => m.hrmsemployeesalarymasterModule) },
                    { path: 'hrmsemployeesalarymastershistories', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeesalarymastershistory/hrmsemployeesalarymastershistory.module').then(m => m.hrmsemployeesalarymastershistoryModule) },
                    { path: 'hrmsemployeesectionwaivers', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeesectionwaiver/hrmsemployeesectionwaiver.module').then(m => m.hrmsemployeesectionwaiverModule) },
                    { path: 'hrmsemployeeskills', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeeskill/hrmsemployeeskill.module').then(m => m.hrmsemployeeskillModule) },
                    { path: 'hrmsemployeestationaryrequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeestationaryrequest/hrmsemployeestationaryrequest.module').then(m => m.hrmsemployeestationaryrequestModule) },
                    { path: 'hrmsemployeestatutorybenefits', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeestatutorybenefit/hrmsemployeestatutorybenefit.module').then(m => m.hrmsemployeestatutorybenefitModule) },
                    { path: 'hrmsemployeetaxcalculations', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeetaxcalculation/hrmsemployeetaxcalculation.module').then(m => m.hrmsemployeetaxcalculationModule) },
                    { path: 'hrmsemployeetaxdeclarations', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeetaxdeclaration/hrmsemployeetaxdeclaration.module').then(m => m.hrmsemployeetaxdeclarationModule) },
                    { path: 'hrmsemployeetransfers', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeetransfer/hrmsemployeetransfer.module').then(m => m.hrmsemployeetransferModule) },
                    { path: 'hrmsemployeetraveldocuments', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployeetraveldocument/hrmsemployeetraveldocument.module').then(m => m.hrmsemployeetraveldocumentModule) },
                    { path: 'hrmsemployerchecklists', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployerchecklist/hrmsemployerchecklist.module').then(m => m.hrmsemployerchecklistModule) },
                    { path: 'hrmsemployerchecklistconfigmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployerchecklistconfigmaster/hrmsemployerchecklistconfigmaster.module').then(m => m.hrmsemployerchecklistconfigmasterModule) },
                    { path: 'hrmseosmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmseosmaster/hrmseosmaster.module').then(m => m.hrmseosmasterModule) },
                    { path: 'hrmsholidayworkrequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsholidayworkrequest/hrmsholidayworkrequest.module').then(m => m.hrmsholidayworkrequestModule) },
                    { path: 'hrmsinductionmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsinductionmaster/hrmsinductionmaster.module').then(m => m.hrmsinductionmasterModule) },
                    { path: 'hrmsinductionschedules', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsinductionschedule/hrmsinductionschedule.module').then(m => m.hrmsinductionscheduleModule) },
                    { path: 'hrmsinterviewschedules', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsinterviewschedule/hrmsinterviewschedule.module').then(m => m.hrmsinterviewscheduleModule) },
                    { path: 'hrmsitadditionaltaxs', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsitadditionaltax/hrmsitadditionaltax.module').then(m => m.hrmsitadditionaltaxModule) },
                    { path: 'hrmsitgeneralwaivers', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsitgeneralwaiver/hrmsitgeneralwaiver.module').then(m => m.hrmsitgeneralwaiverModule) },
                    { path: 'hrmsitslabmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsitslabmaster/hrmsitslabmaster.module').then(m => m.hrmsitslabmasterModule) },
                    { path: 'hrmskramasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmskramaster/hrmskramaster.module').then(m => m.hrmskramasterModule) },
                    { path: 'hrmsleavepolicymasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsleavepolicymaster/hrmsleavepolicymaster.module').then(m => m.hrmsleavepolicymasterModule) },
                    { path: 'hrmsleaverequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsleaverequest/hrmsleaverequest.module').then(m => m.hrmsleaverequestModule) },
                    { path: 'hrmsletterrequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsletterrequest/hrmsletterrequest.module').then(m => m.hrmsletterrequestModule) },
                    { path: 'hrmsloanschememasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsloanschememaster/hrmsloanschememaster.module').then(m => m.hrmsloanschememasterModule) },
                    { path: 'hrmsmanpowerrequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsmanpowerrequest/hrmsmanpowerrequest.module').then(m => m.hrmsmanpowerrequestModule) },
                    { path: 'hrmsodrequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsodrequest/hrmsodrequest.module').then(m => m.hrmsodrequestModule) },
                    { path: 'hrmspaschedules', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmspaschedule/hrmspaschedule.module').then(m => m.hrmspascheduleModule) },
                    { path: 'hrmsquestionmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsquestionmaster/hrmsquestionmaster.module').then(m => m.hrmsquestionmasterModule) },
                    { path: 'hrmspermissionrequests', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmspermissionrequest/hrmspermissionrequest.module').then(m => m.hrmspermissionrequestModule) },
                    { path: 'hrmsrecruitmentagencies', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsrecruitmentagency/hrmsrecruitmentagency.module').then(m => m.hrmsrecruitmentagencyModule) },
                    { path: 'hrmssalarymasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmssalarymaster/hrmssalarymaster.module').then(m => m.hrmssalarymasterModule) },
                    { path: 'hrmssectionwaivers', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmssectionwaiver/hrmssectionwaiver.module').then(m => m.hrmssectionwaiverModule) },
                    { path: 'hrmsshiftmasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsshiftmaster/hrmsshiftmaster.module').then(m => m.hrmsshiftmasterModule) },
                    { path: 'hrmsstatutorymasters', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmsstatutorymaster/hrmsstatutorymaster.module').then(m => m.hrmsstatutorymasterModule) },
                    { path: 'hrmssubordinatedetails', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmssubordinatedetail/hrmssubordinatedetail.module').then(m => m.hrmssubordinatedetailModule) },
                    { path: 'hrmstamssettings', loadChildren: () => import('../../../n-tire-hrms-app/src/app/pages/forms/hrmstamssetting/hrmstamssetting.module').then(m => m.hrmstamssettingModule) },
                    //project//{ path: 'invoiceservecustomermasters', loadChildren: () => import('src/app/pages/forms/invoiceservecustomermaster/invoiceservecustomermaster.module').then(m => m.invoiceservecustomermasterModule) },
                    //project//{ path: 'invoiceserveinvoicemasters', loadChildren: () => import('src/app/pages/forms/invoiceserveinvoicemaster/invoiceserveinvoicemaster.module').then(m => m.invoiceserveinvoicemasterModule) },
                    //project//{ path: 'invoiceserveitemmasters', loadChildren: () => import('src/app/pages/forms/invoiceserveitemmaster/invoiceserveitemmaster.module').then(m => m.invoiceserveitemmasterModule) },
                    //project//{ path: 'invoiceservepurchaseorders', loadChildren: () => import('src/app/pages/forms/invoiceservepurchaseorder/invoiceservepurchaseorder.module').then(m => m.invoiceservepurchaseorderModule) },
                    //project//{ path: 'invoiceservetargets', loadChildren: () => import('src/app/pages/forms/invoiceservetarget/invoiceservetarget.module').then(m => m.invoiceservetargetModule) },
                    //project//{ path: 'invoiceservetaxmasters', loadChildren: () => import('src/app/pages/forms/invoiceservetaxmaster/invoiceservetaxmaster.module').then(m => m.invoiceservetaxmasterModule) },
                    { path: 'legalcases', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcase/legalcase.module').then(m => m.legalcaseModule) },
                    { path: 'legalcourtmasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcourtmaster/legalcourtmaster.module').then(m => m.legalcourtmasterModule) },
                    { path: 'legalcourtprocessmasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcourtprocessmaster/legalcourtprocessmaster.module').then(m => m.legalcourtprocessmasterModule) },
                    { path: 'legalcustomermasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalcustomermaster/legalcustomermaster.module').then(m => m.legalcustomermasterModule) },
                    { path: 'legalinterdepartmentqueries', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalinterdepartmentquery/legalinterdepartmentquery.module').then(m => m.legalinterdepartmentqueryModule) },
                    { path: 'legallawyermasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legallawyermaster/legallawyermaster.module').then(m => m.legallawyermasterModule) },
                    { path: 'legalmatters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legalmatter/legalmatter.module').then(m => m.legalmatterModule) },
                    { path: 'legaltaskmasters', loadChildren: () => import('../../../n-tire-legal-app/src/app/pages/forms/legaltaskmaster/legaltaskmaster.module').then(m => m.legaltaskmasterModule) },
                    { path: 'lmsassigns', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsassign/lmsassign.module').then(m => m.lmsassignModule) },
                    { path: 'lmscampaignmasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscampaignmaster/lmscampaignmaster.module').then(m => m.lmscampaignmasterModule) },
                    { path: 'lmscampaigntasks', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscampaigntask/lmscampaigntask.module').then(m => m.lmscampaigntaskModule) },
                    { path: 'lmscorporatesecondarycontacts', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.module').then(m => m.lmscorporatesecondarycontactModule) },
                    { path: 'lmsmasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsmaster/lmsmaster.module').then(m => m.lmsmasterModule) },
                    { path: 'lmspendings', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmspending/lmspending.module').then(m => m.lmspendingModule) },
                    { path: 'lmsproducts', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsproduct/lmsproduct.module').then(m => m.lmsproductModule) },
                    { path: 'lmsproductmasters', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsproductmaster/lmsproductmaster.module').then(m => m.lmsproductmasterModule) },
                    { path: 'lmsresponses', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsresponse/lmsresponse.module').then(m => m.lmsresponseModule) },
                    { path: 'lmsscoringfixedfieldsnegatives', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsscoringfixedfieldsnegative/lmsscoringfixedfieldsnegative.module').then(m => m.lmsscoringfixedfieldsnegativeModule) },
                    { path: 'lmsscoringfixedfieldspositives', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsscoringfixedfieldspositive/lmsscoringfixedfieldspositive.module').then(m => m.lmsscoringfixedfieldspositiveModule) },
                    { path: 'lmsscoringplannedclosedates', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmsscoringplannedclosedate/lmsscoringplannedclosedate.module').then(m => m.lmsscoringplannedclosedateModule) },
                    { path: 'lmstargetbranchlevels', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmstargetbranchlevel/lmstargetbranchlevel.module').then(m => m.lmstargetbranchlevelModule) },
                    { path: 'lmstargetorglevels', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmstargetorglevel/lmstargetorglevel.module').then(m => m.lmstargetorglevelModule) },
                    { path: 'lmstargetuserlevels', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmstargetuserlevel/lmstargetuserlevel.module').then(m => m.lmstargetuserlevelModule) },
                    { path: 'lmstasks', loadChildren: () => import('../../../n-tire-crm-app/src/app/pages/forms/lmstask/lmstask.module').then(m => m.lmstaskModule) },
                    { path: 'systemcolumns', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/systemcolumn/systemcolumn.module').then(m => m.systemcolumnModule) },
                    { path: 'systemtables', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/systemtable/systemtable.module').then(m => m.systemtableModule) },
                    { path: 'workflowmasters', loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/workflowmaster/workflowmaster.module').then(m => m.workflowmasterModule) },
                    { path: 'erpfaaccountperiodmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfaaccountperiodmaster/erpfaaccountperiodmaster.module').then(m => m.erpfaaccountperiodmasterModule) },
                    { path: 'erpfacostcategories', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfacostcategory/erpfacostcategory.module').then(m => m.erpfacostcategoryModule) },
                    { path: 'erpfaaccountmasters', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfaaccountmaster/erpfaaccountmaster.module').then(m => m.erpfaaccountmasterModule) },
                    { path: 'erpfabankaccounts', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfabankaccount/erpfabankaccount.module').then(m => m.erpfabankaccountModule) },
                    { path: 'erpfamergeaccounts', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfamergeaccount/erpfamergeaccount.module').then(m => m.erpfamergeaccountModule) },
                    { path: 'erpfachequebooks', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfachequebook/erpfachequebook.module').then(m => m.erpfachequebookModule) },
                    { path: 'erpfachequestatuses', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfachequestatus/erpfachequestatus.module').then(m => m.erpfachequestatusModule) },
                    { path: 'erpfacostcategoryglmappings', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfacostcategoryglmapping/erpfacostcategoryglmapping.module').then(m => m.erpfacostcategoryglmappingModule) },
                    { path: 'erpfaaccountbalancefinyears', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfaaccountbalancefinyear/erpfaaccountbalancefinyear.module').then(m => m.erpfaaccountbalancefinyearModule) },
                    { path: 'erpfaaccountbalancemonths', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfaaccountbalancemonth/erpfaaccountbalancemonth.module').then(m => m.erpfaaccountbalancemonthModule) },
                    { path: 'erpfajournals', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfajournal/erpfajournal.module').then(m => m.erpfajournalModule) },
                    { path: 'erpfacreditdebitnotes', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfacreditdebitnote/erpfacreditdebitnote.module').then(m => m.erpfacreditdebitnoteModule) },
                    { path: 'erpfaarbookings', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfaarbooking/erpfaarbooking.module').then(m => m.erpfaarbookingModule) },
                    { path: 'erpfaapentries', loadChildren: () => import('../../../n-tire-procurement-app/src/app/pages/forms/erpfaapentry/erpfaapentry.module').then(m => m.erpfaapentryModule) },

                ]
            },
        ]
    },
];
*/

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({

    exports: [

    ],

    declarations: [

    ],

    imports: [
        NgCommonModule,
        RouterModule.forChild(paths),
        FormsModule, ReactiveFormsModule,

        CommonModule,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
    ],

})
export class NgWorkFlowModule { }

