import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeereward.routing';
import { hrmsemployeerewardComponent } from './hrmsemployeereward.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeerewardComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeerewardComponent],
  entryComponents: []
})
export class hrmsemployeerewardModule { }
