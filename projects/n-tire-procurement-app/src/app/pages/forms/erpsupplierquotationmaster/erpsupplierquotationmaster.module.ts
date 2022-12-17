import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpsupplierquotationmaster.routing';
import { erpsupplierquotationmasterComponent } from './erpsupplierquotationmaster.component';
import { erpsupplierquotationdetailComponent } from './erpsupplierquotationdetail.component';


@NgModule({
  exports: [
    NgCommonModule, erpsupplierquotationdetailComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpsupplierquotationmasterComponent, erpsupplierquotationdetailComponent],
  entryComponents: [erpsupplierquotationdetailComponent]
})
export class erpsupplierquotationmasterModule { }
