import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeelettermanagement.routing';
import { hrmsemployeelettermanagementComponent } from './hrmsemployeelettermanagement.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeelettermanagementComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeelettermanagementComponent],
  entryComponents: []
})
export class hrmsemployeelettermanagementModule { }
