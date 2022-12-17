import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './cmsformpage.routing';
import { cmsformpageComponent } from './cmsformpage.component';
import { cmspagequestionComponent } from './cmspagequestion.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [cmsformpageComponent, cmspagequestionComponent],
  entryComponents: [cmspagequestionComponent]
})
export class cmsformpageModule { }
