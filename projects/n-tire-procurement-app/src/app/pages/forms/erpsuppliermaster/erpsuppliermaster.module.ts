import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpsuppliermaster.routing';
import { erpsuppliermasterComponent } from './erpsuppliermaster.component';
import { erpsuppliercertificationComponent } from '../erpsuppliercertification/erpsuppliercertification.component';

import { erpsupplierfinancialdataComponent } from '../erpsupplierfinancialdata/erpsupplierfinancialdata.component';
import { erpsupplierreferenceComponent } from '../erpsupplierreference/erpsupplierreference.component';
import { erpsupplieritemModule } from '../erpsupplieritem/erpsupplieritem.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, erpsupplieritemModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpsuppliermasterComponent, erpsuppliercertificationComponent, erpsupplierfinancialdataComponent, erpsupplierreferenceComponent],
  entryComponents: [erpsuppliercertificationComponent, erpsupplierfinancialdataComponent, erpsupplierreferenceComponent]
})
export class erpsuppliermasterModule { }
