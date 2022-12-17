import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstapplicantmaster.routing';
import { mstapplicantmasterComponent } from './mstapplicantmaster.component';
import { mstapplicantmasterviewComponent } from './mstapplicantmasterview.component';
import { mstapplicantworkreferenceModule } from './../../../pages/forms/mstapplicantworkreference/mstapplicantworkreference.module';
import { mstapplicantsocialmediadetailModule } from './../../../pages/forms/mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.module';

import { mstapplicantskilldetailModule } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.module';
import { mstapplicantgeographypreferenceModule } from './../../../pages/forms/mstapplicantgeographypreference/mstapplicantgeographypreference.module';
import { mstapplicanteducationdetailModule } from './../../../pages/forms/mstapplicanteducationdetail/mstapplicanteducationdetail.module';
import { mstapplicantcareerdetailModule } from './../../../pages/forms/mstapplicantcareerdetail/mstapplicantcareerdetail.module';
import { mstapplicantlanguagedetailModule } from './../../../pages/forms/mstapplicantlanguagedetail/mstapplicantlanguagedetail.module';
import { mstapplicantreferencedetailModule } from './../../../pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.module';
import { mstapplicantreferencerequestModule } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.module';
import { mstapplicantachievementdetailModule } from './../../../pages/forms/mstapplicantachievementdetail/mstapplicantachievementdetail.module';
import { mstjobstatusModule } from './../../../pages/forms/mstjobstatus/mstjobstatus.module';
import { mstapplicantmastermainComponent } from './mstapplicantmastermain.component';
import { mstresumeapplicantComponent } from './mstresumeapplicant.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, mstapplicantworkreferenceModule, mstapplicantsocialmediadetailModule, mstjobstatusModule,
    mstapplicantskilldetailModule, mstapplicantgeographypreferenceModule, mstapplicanteducationdetailModule, mstapplicantcareerdetailModule,
    mstapplicantlanguagedetailModule, mstapplicantreferencedetailModule, mstapplicantreferencerequestModule, mstapplicantachievementdetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    mstapplicantmasterComponent,
    mstapplicantmasterviewComponent,
    mstapplicantmastermainComponent,
    mstresumeapplicantComponent
  ]
})
export class mstapplicantmasterModule { }
