import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erplocationmaster.routing';
import { erplocationmasterComponent } from './erplocationmaster.component';
//import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,
    //CanDeactivateGuard

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erplocationmasterComponent]
})
export class erplocationmasterModule { }
