import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './umstopicmaster.routing';
import { umstopicmasterComponent } from './umstopicmaster.component';
import { umsquestionModule } from '../umsquestion/umsquestion.module';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,
    umsquestionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [umstopicmasterComponent]
})
export class umstopicmasterModule { }
