import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hlpticket.routing';
import { hlpticketComponent } from './hlpticket.component';
import { hlpticketdetailModule } from '../hlpticketdetail/hlpticketdetail.module';
import { hlpplannedactionModule } from '../hlpplannedaction/hlpplannedaction.module';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, hlpplannedactionModule, hlpticketdetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hlpticketComponent],
  entryComponents: []
})
export class hlpticketModule { }
