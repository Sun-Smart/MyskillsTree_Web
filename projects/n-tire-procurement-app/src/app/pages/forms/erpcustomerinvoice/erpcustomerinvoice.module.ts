import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpcustomerinvoice.routing';
import { erpcustomerinvoiceComponent } from './erpcustomerinvoice.component';
import { erpcustomerinvoicedetailModule } from '../erpcustomerinvoicedetail/erpcustomerinvoicedetail.module';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,erpcustomerinvoicedetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpcustomerinvoiceComponent]
})
export class erpcustomerinvoiceModule { }
