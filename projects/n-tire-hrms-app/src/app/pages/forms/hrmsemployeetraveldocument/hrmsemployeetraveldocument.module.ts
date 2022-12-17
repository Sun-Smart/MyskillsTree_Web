import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeetraveldocument.routing';
import { hrmsemployeetraveldocumentComponent } from './hrmsemployeetraveldocument.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeetraveldocumentComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeetraveldocumentComponent],
  entryComponents: []
})
export class hrmsemployeetraveldocumentModule { }
