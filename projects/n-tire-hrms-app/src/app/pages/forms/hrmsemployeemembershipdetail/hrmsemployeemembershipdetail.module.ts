import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeemembershipdetail.routing';
import { hrmsemployeemembershipdetailComponent } from './hrmsemployeemembershipdetail.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeemembershipdetailComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeemembershipdetailComponent],
  entryComponents: []
})
export class hrmsemployeemembershipdetailModule { }
