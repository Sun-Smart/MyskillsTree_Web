import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsemployeetransfer.routing';
import { hrmsemployeetransferComponent } from './hrmsemployeetransfer.component';


@NgModule({
  exports: [
    NgCommonModule, hrmsemployeetransferComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsemployeetransferComponent],
  entryComponents: []
})
export class hrmsemployeetransferModule { }
