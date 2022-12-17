import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './pmslease.routing';
import { pmsleaseComponent } from '../pmslease/pmslease.component';

import { pmschargeModule } from '../pmscharge/pmscharge.module';

import { pmsdepositModule } from '../pmsdeposit/pmsdeposit.module';
import { pmstransactionscheduleModule } from '../pmstransactionschedule/pmstransactionschedule.module';
import { pmstransactionModule } from '../pmstransaction/pmstransaction.module';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule,pmstransactionModule,
    pmschargeModule, pmsdepositModule,  pmstransactionscheduleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [pmsleaseComponent],
  entryComponents: []
})
export class pmsleaseModule { }
