import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erprfqmaster.routing';
import { erprfqmasterComponent } from './erprfqmaster.component';
import { erprfqdetailModule } from '../erprfqdetail/erprfqdetail.module';
import { erppurchaserequestdetailComponent } from '../erppurchaserequestdetail/erppurchaserequestdetail.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, erprfqdetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erprfqmasterComponent, erppurchaserequestdetailComponent],
  entryComponents: [erppurchaserequestdetailComponent]
})
export class erprfqmasterModule { }
