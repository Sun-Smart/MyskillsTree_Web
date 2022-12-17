import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstapplicantreferenceaccepted.routing';
import { MstapplicantreferenceacceptedComponent } from './mstapplicantreferenceaccepted.component';
// import { mstapplicantreferencegridComponent } from './mstapplicantreferencegrid.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [MstapplicantreferenceacceptedComponent]
})
export class mstapplicantreferencerequestModule { }
