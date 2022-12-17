import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstcorporatemaster.routing';
import { mstcorporatemasterComponent } from './mstcorporatemaster.component';
import { mstcorporatelocationComponent } from '../mstcorporatelocation/mstcorporatelocation.component';
import { mstjobrequirementComponent } from '../mstjobrequirement/mstjobrequirement.component';
import { mstjobstatusComponent } from '../mstjobstatus/mstjobstatus.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [mstcorporatemasterComponent, mstjobrequirementComponent, mstjobstatusComponent, mstcorporatelocationComponent],
  entryComponents: [mstjobrequirementComponent, mstjobstatusComponent, mstcorporatelocationComponent]
})
export class mstcorporatemasterModule { }
