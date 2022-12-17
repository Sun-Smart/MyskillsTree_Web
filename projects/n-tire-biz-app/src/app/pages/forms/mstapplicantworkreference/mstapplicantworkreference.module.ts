import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstapplicantworkreference.routing';
import { mstapplicantworkreferenceComponent } from './mstapplicantworkreference.component';
import { mstapplicantworkrefgridComponent } from './mstapplicantworkrefgrid.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [mstapplicantworkreferenceComponent,mstapplicantworkrefgridComponent]
})
export class mstapplicantworkreferenceModule { }
