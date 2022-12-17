import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeeskill.routing';
import { hrmsemployeeskillComponent } from './hrmsemployeeskill.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeeskillComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeeskillComponent],
  entryComponents: []
})
export class hrmsemployeeskillModule { }
