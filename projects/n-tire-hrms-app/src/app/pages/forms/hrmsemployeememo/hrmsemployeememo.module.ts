import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeememo.routing';
import { hrmsemployeememoComponent } from './hrmsemployeememo.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeememoComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeememoComponent],
  entryComponents: []
})
export class hrmsemployeememoModule { }
