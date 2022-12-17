import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './boreport.routing';
import { boreportComponent } from './boreport.component';
import { boreportcolumnModule } from '../boreportcolumn/boreportcolumn.module';
import { boreportdetailModule } from '../boreportdetail/boreportdetail.module';
import { boreportothertableModule } from '../boreportothertable/boreportothertable.module';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,boreportcolumnModule,boreportdetailModule,boreportothertableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [boreportComponent]
})
export class boreportModule { }
