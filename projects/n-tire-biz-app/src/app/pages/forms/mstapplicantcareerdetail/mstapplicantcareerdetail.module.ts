import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstapplicantcareerdetail.routing';
import { mstapplicantcareerdetailComponent } from './mstapplicantcareerdetail.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { mstapplicantcareergridComponent } from './mstapplicantcareergrid.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,
    AutoCompleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [mstapplicantcareerdetailComponent,mstapplicantcareergridComponent]
})
export class mstapplicantcareerdetailModule { }
