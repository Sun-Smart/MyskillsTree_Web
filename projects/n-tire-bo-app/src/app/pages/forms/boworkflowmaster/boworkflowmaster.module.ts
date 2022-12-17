import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './boworkflowmaster.routing';
import { boworkflowmasterComponent } from './boworkflowmaster.component';
import { boworkflowstepModule } from '../boworkflowstep/boworkflowstep.module';
import { boworkflowModule } from '../boworkflow/boworkflow.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,boworkflowstepModule,boworkflowModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [boworkflowmasterComponent]
})
export class boworkflowmasterModule { }
