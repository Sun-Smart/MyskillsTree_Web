import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './pmspropertyowner.routing';
import { pmspropertyownerComponent } from './pmspropertyowner.component';
import { pmsownerkycdetailModule } from '../pmsownerkycdetail/pmsownerkycdetail.module';
import { pmspropertyunitownerModule } from '../pmspropertyunitowner/pmspropertyunitowner.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,pmsownerkycdetailModule,pmspropertyunitownerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [pmspropertyownerComponent],
  entryComponents: []
})
export class pmspropertyownerModule { }
