import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeeinfrarequestmaster.routing';
import { hrmsemployeeinfrarequestmasterComponent } from './hrmsemployeeinfrarequestmaster.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeeinfrarequestmasterComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeeinfrarequestmasterComponent],
  entryComponents: []
})
export class hrmsemployeeinfrarequestmasterModule { }
