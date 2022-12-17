import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './lmscall.routing';
import { lmscallComponent } from './lmscall.component';
import { lmstaskModule } from '../lmstask/lmstask.module';
import { lmshistoryModule } from '../lmshistory/lmshistory.module';
import { lmsreminderModule } from '../lmsreminder/lmsreminder.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, lmshistoryModule, lmsreminderModule, lmstaskModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [lmscallComponent]
})
export class lmscallModule { }
