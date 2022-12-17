import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpphysicalinventorymaster.routing';
import { erpphysicalinventorymasterComponent } from './erpphysicalinventorymaster.component';
import { erpphysicalinventorydetailModule } from '../erpphysicalinventorydetail/erpphysicalinventorydetail.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,erpphysicalinventorydetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpphysicalinventorymasterComponent]
})
export class erpphysicalinventorymasterModule { }
