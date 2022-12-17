import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bomasterdatatype.routing';
import { bomasterdatatypeComponent } from './bomasterdatatype.component';
import { bomasterdataModule } from '../bomasterdata/bomasterdata.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, bomasterdataModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bomasterdatatypeComponent]
})
export class bomasterdatatypeModule { }
