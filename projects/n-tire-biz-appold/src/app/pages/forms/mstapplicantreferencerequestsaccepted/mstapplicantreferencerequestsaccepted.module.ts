import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../appcommon.module';
import { boreportviewerModule } from '../boreportviewer/boreportviewer.module';
import { routing } from './mstapplicantreferencerequestsaccepted.routing';

import { mstapplicantreferencegridComponent } from './mstapplicantreferencegrid.component';
import { mstapplicantreferencerequestsacceptedComponent } from './mstapplicantreferencerequestsaccepted.component';
// import { mstapplicantreferencedetailModule } from '../mstapplicantreferencedetail/mstapplicantreferencedetail.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [mstapplicantreferencegridComponent,mstapplicantreferencerequestsacceptedComponent]})
export class mstapplicantreferencerequestsacceptedModule { }



