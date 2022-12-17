import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erppurchaseordermaster.routing';
import { erppurchaseordermasterComponent } from './erppurchaseordermaster.component';
import { erppurchaseorderdetailModule } from '../erppurchaseorderdetail/erppurchaseorderdetail.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, erppurchaseorderdetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erppurchaseordermasterComponent]
})
export class erppurchaseordermasterModule { }
