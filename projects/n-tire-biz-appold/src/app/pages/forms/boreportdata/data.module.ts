import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './data.routing';
import { dataComponent } from './data.component';
//import { mstapplicantmasterModule } from '../mstapplicantmaster/mstapplicantmaster.module';

@NgModule({
  exports: [
    NgCommonModule

  ],
  imports: [boreportviewerModule,
    //mstapplicantmasterModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [dataComponent]
})
export class dataModule { }
