import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './camspmschedule.routing';
import { camspmscheduleComponent } from './camspmschedule.component';
import { camspmscheduletaskModule } from '../camspmscheduletask/camspmscheduletask.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule,camspmscheduletaskModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [camspmscheduleComponent]
})
export class camspmscheduleModule { }
