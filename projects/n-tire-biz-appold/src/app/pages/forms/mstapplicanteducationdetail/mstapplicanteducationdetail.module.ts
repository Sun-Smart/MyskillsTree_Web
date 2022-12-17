import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstapplicanteducationdetail.routing';
import { mstapplicanteducationdetailComponent } from './mstapplicanteducationdetail.component';
import { mstapplicanteducationdetailgridComponent } from './mstapplicanteducationgrid.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [mstapplicanteducationdetailComponent,mstapplicanteducationdetailgridComponent]
})
export class mstapplicanteducationdetailModule { }
