import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './boprocesstask.routing';
import { boprocesstaskComponent } from './boprocesstask.component';
import { boprocesstaskformModule } from '../boprocesstaskform/boprocesstaskform.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,boprocesstaskformModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [boprocesstaskComponent]
})
export class boprocesstaskModule { }
