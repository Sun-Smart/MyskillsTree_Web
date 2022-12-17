import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erppurchaserequest.routing';
import { erppurchaserequestComponent } from './erppurchaserequest.component';
import { erppurchaserequestdetailComponent } from '../erppurchaserequestdetail/erppurchaserequestdetail.component';




@NgModule({
  exports: [
    NgCommonModule,
    erppurchaserequestdetailComponent
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erppurchaserequestComponent, erppurchaserequestdetailComponent],
  entryComponents: [erppurchaserequestdetailComponent]
})
export class erppurchaserequestModule { }
