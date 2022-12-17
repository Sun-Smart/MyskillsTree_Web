import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './pmsworkorder.routing';
import { pmsworkorderComponent } from './pmsworkorder.component';
import { pmsworkorderdetailModule } from '../pmsworkorderdetail/pmsworkorderdetail.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,pmsworkorderdetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [pmsworkorderComponent],
  entryComponents:[]
})
export class pmsworkorderModule { }
