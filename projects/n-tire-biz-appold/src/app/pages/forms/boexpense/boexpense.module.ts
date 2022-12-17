import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './boexpense.routing';
import { boexpenseComponent } from './boexpense.component';
import { boexpensedetailModule } from '../boexpensedetail/boexpensedetail.module';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, boexpensedetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [boexpenseComponent]
})
export class boexpenseModule { }
