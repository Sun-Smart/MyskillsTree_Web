import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './camsworkorder.routing';
import { camsworkorderComponent } from './camsworkorder.component';
import { camsworkdetailModule } from '../camsworkdetail/camsworkdetail.module';
//import { camsworktimelogModule } from '../camsworkdetail/camsworktimelog.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule,camsworkdetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [camsworkorderComponent],
  entryComponents: [ ]
})
export class camsworkorderModule { }
