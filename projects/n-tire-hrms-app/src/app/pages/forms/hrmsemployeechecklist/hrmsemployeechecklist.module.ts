import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeechecklist.routing';
import { hrmsemployeechecklistComponent } from './hrmsemployeechecklist.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeechecklistComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeechecklistComponent],
  entryComponents: []
})
export class hrmsemployeechecklistModule { }
