import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeepresentation.routing';
import { hrmsemployeepresentationComponent } from './hrmsemployeepresentation.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeepresentationComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeepresentationComponent],
  entryComponents: []
})
export class hrmsemployeepresentationModule { }
