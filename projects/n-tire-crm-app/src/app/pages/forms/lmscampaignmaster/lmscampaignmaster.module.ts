import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './lmscampaignmaster.routing';
import { lmscampaignmasterComponent } from './lmscampaignmaster.component';
import { lmscampaigntaskComponent } from '../lmscampaigntask/lmscampaigntask.component';
import { lmspostComponent } from './lmspost.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [lmscampaignmasterComponent, lmscampaigntaskComponent, lmspostComponent],
  entryComponents: [lmscampaigntaskComponent, lmspostComponent]
})
export class lmscampaignmasterModule { }
