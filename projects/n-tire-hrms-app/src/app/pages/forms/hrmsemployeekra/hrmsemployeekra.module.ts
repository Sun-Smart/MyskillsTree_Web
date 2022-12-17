import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeekra.routing';
import { hrmsemployeekraComponent } from './hrmsemployeekra.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeekraComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeekraComponent],
  entryComponents: []
})
export class hrmsemployeekraModule { }
