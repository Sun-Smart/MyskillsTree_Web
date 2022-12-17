import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeecareer.routing';
import { hrmsemployeecareerComponent } from './hrmsemployeecareer.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeecareerComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeecareerComponent],
  entryComponents: []
})
export class hrmsemployeecareerModule { }
