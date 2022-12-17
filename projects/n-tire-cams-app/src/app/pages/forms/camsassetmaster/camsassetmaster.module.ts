import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './camsassetmaster.routing';
import { camsassetmasterComponent } from './camsassetmaster.component';
import { camsassetreadingModule } from '../camsassetreading/camsassetreading.module';
import { camsassetreadinghistoryModule } from '../camsassetreadinghistory/camsassetreadinghistory.module';
import { camsassettransferModule } from '../camsassettransfer/camsassettransfer.module';
import { camsassetdisposalModule } from '../camsassetdisposal/camsassetdisposal.module';
import { camsassetadditionModule } from '../camsassetaddition/camsassetaddition.module';
import { camspmscheduleModule } from '../camspmschedule/camspmschedule.module';
import { camsworkorderModule } from '../camsworkorder/camsworkorder.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, camsassetreadingModule, camsassetreadinghistoryModule, camsassettransferModule, camsassetadditionModule, camsassetdisposalModule, boreportviewerModule,
    camspmscheduleModule,camsworkorderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [camsassetmasterComponent]
})
export class camsassetmasterModule { }
