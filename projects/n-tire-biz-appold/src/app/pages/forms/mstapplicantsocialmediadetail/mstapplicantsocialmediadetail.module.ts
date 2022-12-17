import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstapplicantsocialmediadetail.routing';
import { mstapplicantsocialmediadetailComponent } from './mstapplicantsocialmediadetail.component';
import { mstapplicantsocialmediagridComponent } from './mstapplicantsocialmediagrid.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [mstapplicantsocialmediadetailComponent,mstapplicantsocialmediagridComponent]
})
export class mstapplicantsocialmediadetailModule { }
