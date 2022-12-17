import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bomeeting.routing';
import { bomeetingComponent } from './bomeeting.component';

import { bomeetinginviteModule } from '../bomeetinginvite/bomeetinginvite.module';
import { bomeetingreminderModule } from '../bomeetingreminder/bomeetingreminder.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,bomeetinginviteModule,bomeetingreminderModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bomeetingComponent]
})
export class bomeetingModule { }
