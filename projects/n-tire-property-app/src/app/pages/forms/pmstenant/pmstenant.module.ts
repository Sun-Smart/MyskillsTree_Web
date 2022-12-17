import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './pmstenant.routing';
import { pmstenantComponent } from './pmstenant.component';
import { pmskycdetailModule } from '../pmskycdetail/pmskycdetail.module';
import { pmspdcModule } from '../pmspdc/pmspdc.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, pmskycdetailModule,pmspdcModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [pmstenantComponent],
  entryComponents: []
})
export class pmstenantModule { }
