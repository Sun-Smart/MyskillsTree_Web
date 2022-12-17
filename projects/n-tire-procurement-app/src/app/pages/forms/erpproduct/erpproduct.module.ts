import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpproduct.routing';
import { erpproductComponent } from './erpproduct.component';

import { erpproductfeatureparameterModule } from '../erpproductfeatureparameter/erpproductfeatureparameter.module';

import { erpproductpricehistoryModule } from '../erpproductpricehistory/erpproductpricehistory.module';

import { erpproductimageModule } from '../erpproductimage/erpproductimage.module';
import { ecmreviewModule } from '../../../../../../n-tire-commerce-app/src/app/pages/forms/ecmreview/ecmreview.module';
import { ecmcustomerbasketModule } from '../../../../../../n-tire-commerce-app/src/app/pages/forms/ecmcustomerbasket/ecmcustomerbasket.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,ecmreviewModule, erpproductimageModule,erpproductpricehistoryModule, erpproductfeatureparameterModule,ecmcustomerbasketModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpproductComponent]
})
export class erpproductModule { }
