import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './boconfigvalue.routing';
import { boconfigvalueComponent } from './boconfigvalue.component';
import { bosubconfigvalueModule } from '../bosubconfigvalue/bosubconfigvalue.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, bosubconfigvalueModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [boconfigvalueComponent]
})
export class boconfigvalueModule { }
