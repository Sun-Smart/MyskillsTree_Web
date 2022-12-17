import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeeeducation.routing';
import { hrmsemployeeeducationComponent } from './hrmsemployeeeducation.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeeeducationComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeeeducationComponent],
  entryComponents: []
})
export class hrmsemployeeeducationModule { }
