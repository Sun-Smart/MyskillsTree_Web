import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './legaltaskmaster.routing';
import { legaltaskmasterComponent } from './legaltaskmaster.component';
import { legaltaskresponseComponent } from '../legaltaskresponse/legaltaskresponse.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule,
    boreportviewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [legaltaskmasterComponent, legaltaskresponseComponent],
  entryComponents: [legaltaskresponseComponent]
})
export class legaltaskmasterModule { }
