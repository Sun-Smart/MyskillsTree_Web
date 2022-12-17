import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeedocument.routing';
import { hrmsemployeedocumentComponent } from './hrmsemployeedocument.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeedocumentComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeedocumentComponent],
  entryComponents: []
})
export class hrmsemployeedocumentModule { }
