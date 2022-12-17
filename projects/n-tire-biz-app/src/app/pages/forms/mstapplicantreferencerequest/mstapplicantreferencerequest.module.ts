import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstapplicantreferencerequest.routing';
import { mstapplicantreferencerequestComponent } from './mstapplicantreferencerequest.component';
import { mstapplicantreferencegridComponent } from './mstapplicantreferencegrid.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [mstapplicantreferencerequestComponent,mstapplicantreferencegridComponent]
})
export class mstapplicantreferencerequestModule { }
