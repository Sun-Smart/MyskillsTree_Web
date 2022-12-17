import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { routing } from './erpgoodsreceiptmaster.routing';
import { erpgoodsreceiptmasterComponent } from './erpgoodsreceiptmaster.component';
import { erpgoodsreceiptdetailModule } from '../erpgoodsreceiptdetail/erpgoodsreceiptdetail.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,erpgoodsreceiptdetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpgoodsreceiptmasterComponent]
})
export class erpgoodsreceiptmasterModule { }
