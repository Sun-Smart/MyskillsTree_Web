import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpcontractordermaster.routing';
import { erpcontractordermasterComponent } from './erpcontractordermaster.component';
import { erpcontractorderdetailComponent } from '../erpcontractorderdetail/erpcontractorderdetail.component';
import { erpcontractordertermComponent } from '../erpcontractorderterm/erpcontractorderterm.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpcontractordermasterComponent, erpcontractorderdetailComponent,erpcontractordertermComponent],
  entryComponents: [erpcontractorderdetailComponent]
})
export class erpcontractordermasterModule { }
