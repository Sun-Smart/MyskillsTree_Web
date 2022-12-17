import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstapplicantgeographypreference.routing';
import { mstapplicantgeographypreferenceComponent } from './mstapplicantgeographypreference.component';
import { mstapplicantgeographygrid } from './mstapplicantgeographygrid.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [mstapplicantgeographypreferenceComponent,mstapplicantgeographygrid]
})
export class mstapplicantgeographypreferenceModule { }
