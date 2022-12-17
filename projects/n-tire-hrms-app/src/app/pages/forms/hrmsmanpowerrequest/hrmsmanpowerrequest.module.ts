import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsmanpowerrequest.routing';
import { hrmsmanpowerrequestComponent } from './hrmsmanpowerrequest.component';
import { hrmsmpragencyComponent } from './hrmsmpragency.component';
import { hrmsmprapplicantComponent } from './hrmsmprapplicant.component';
import { hrmsinterviewscheduleModule } from '../hrmsinterviewschedule/hrmsinterviewschedule.module';
import { hrmsmprassignComponent } from './hrmsmprassign.component';




@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, hrmsinterviewscheduleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsmanpowerrequestComponent, hrmsmpragencyComponent, hrmsmprapplicantComponent, hrmsmprassignComponent],
  entryComponents: [hrmsmpragencyComponent, hrmsmprapplicantComponent, hrmsmprassignComponent]
})
export class hrmsmanpowerrequestModule { }
