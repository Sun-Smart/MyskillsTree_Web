import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './lmsopportunity.routing';
import { lmsopportunityComponent } from './lmsopportunity.component';
import { lmsquoteComponent } from '../lmsquote/lmsquote.component';
import { lmscallModule } from '../lmscall/lmscall.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, lmscallModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [lmsopportunityComponent, lmsquoteComponent],
  entryComponents: [lmsquoteComponent]
})
export class lmsopportunityModule { }
