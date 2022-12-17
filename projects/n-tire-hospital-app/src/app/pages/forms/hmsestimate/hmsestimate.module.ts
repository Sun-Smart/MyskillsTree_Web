import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hmsestimate.routing';
import { hmsestimateComponent } from './hmsestimate.component';
import { hmsestimatedetailComponent } from './hmsestimatedetail.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hmsestimateComponent, hmsestimatedetailComponent],
  entryComponents: [hmsestimatedetailComponent]
})
export class hmsestimateModule { }
