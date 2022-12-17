import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmspaschedule.routing';
import { hrmspascheduleComponent } from './hrmspaschedule.component';


@NgModule({
  exports: [
    NgCommonModule,
    hrmspascheduleComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmspascheduleComponent],
  entryComponents: []
})
export class hrmspascheduleModule { }
