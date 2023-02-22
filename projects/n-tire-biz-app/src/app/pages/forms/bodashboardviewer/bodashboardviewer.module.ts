import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { routing } from './bodashboardviewer.routing';
import { ChartsModule } from 'ng2-charts';
import { mstapplicantskilldetailModule } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.module';
import { BODashboardViewerComponent } from './bodashboardviewer.component';
import { mstapplicantgeographypreferenceModule } from '../mstapplicantgeographypreference/mstapplicantgeographypreference.module';
import { mstapplicantworkreferenceModule } from '../mstapplicantworkreference/mstapplicantworkreference.module';
import { mstapplicantcareerdetailModule } from '../mstapplicantcareerdetail/mstapplicantcareerdetail.module';
import { mstapplicanteducationdetailModule } from '../mstapplicanteducationdetail/mstapplicanteducationdetail.module';
import { mstapplicantsocialmediadetailModule } from '../mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.module';
import { mstapplicantlanguagedetailModule } from '../mstapplicantlanguagedetail/mstapplicantlanguagedetail.module';
import { mstapplicantreferencerequestModule } from '../mstapplicantreferencerequest/mstapplicantreferencerequest.module';
import { mstapplicantachievementdetailModule } from '../mstapplicantachievementdetail/mstapplicantachievementdetail.module';
import { mstapplicantmastermainComponent } from '../mstapplicantmaster/mstapplicantmastermain.component';
import { mstresumeapplicantComponent } from '../mstapplicantmaster/mstresumeapplicant.component';
import {CalendarModule} from 'primeng/calendar';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule,
    ChartsModule,
    mstapplicantskilldetailModule,
    mstapplicantgeographypreferenceModule,
    mstapplicantworkreferenceModule,
    mstapplicantcareerdetailModule,
    mstapplicanteducationdetailModule,
    mstapplicantsocialmediadetailModule,
    mstapplicantlanguagedetailModule,
    mstapplicantreferencerequestModule,
    mstapplicantachievementdetailModule,CalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [BODashboardViewerComponent,mstapplicantmastermainComponent,mstresumeapplicantComponent]
})
export class bodashboardviewerModule { }
