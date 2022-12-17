import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './pmreview.routing';
import { pmreviewComponent } from './pmreview.component';

import { pmreviewdetailComponent } from './pmreviewdetail.component';




@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [pmreviewComponent, pmreviewdetailComponent],
  entryComponents: [pmreviewdetailComponent]
})
export class pmreviewModule { }
