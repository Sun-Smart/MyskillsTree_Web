import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpsupplierpackingmaster.routing';
import { erpsupplierpackingmasterComponent } from './erpsupplierpackingmaster.component';

import { erpsupplierpackingdetailModule } from '../erpsupplierpackingdetail/erpsupplierpackingdetail.module';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule, erpsupplierpackingdetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpsupplierpackingmasterComponent]
})
export class erpsupplierpackingmasterModule { }
