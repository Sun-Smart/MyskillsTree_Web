import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstapplicantskilldetail.routing';
import { mstapplicantskilldetailComponent } from './mstapplicantskilldetail.component';
import { bomasterdataModule } from '../bomasterdata/bomasterdata.module';
import { InputSwitchModule } from "primeng/inputswitch";
import { mstapplicantskilldetailgridComponent } from './mstapplicantskilldetailgrid.component';
import { mstsegmentModule } from '../mstsegment/mstsegment.module';
import { mstcategoryModule } from '../mstcategory/mstcategory.module';
import { mstsubcategoryModule } from '../mstsubcategory/mstsubcategory.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, bomasterdataModule,InputSwitchModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [mstapplicantskilldetailComponent,mstapplicantskilldetailgridComponent,mstsegmentModule,mstcategoryModule,mstsubcategoryModule],
  entryComponents:[mstapplicantskilldetailgridComponent]
})
export class mstapplicantskilldetailModule { }
