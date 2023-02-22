import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './applicantdashboard.routing';
import { applicantdashboardComponent } from './applicantdashboard.component';
import { mstapplicantskilldetailModule } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,
    mstapplicantskilldetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [applicantdashboardComponent],
  entryComponents:[]
})
export class applicantdashboardModule { }
