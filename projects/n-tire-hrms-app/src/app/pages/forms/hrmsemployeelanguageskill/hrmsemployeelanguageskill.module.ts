import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeelanguageskill.routing';
import { hrmsemployeelanguageskillComponent } from './hrmsemployeelanguageskill.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeelanguageskillComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeelanguageskillComponent],
  entryComponents: []
})
export class hrmsemployeelanguageskillModule { }
