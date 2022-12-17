import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './qycomplaintmaster.routing';
import { qycomplaintmasterComponent } from './qycomplaintmaster.component';
import { qyrelatedcomplaintComponent } from './qyrelatedcomplaint.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [qycomplaintmasterComponent, qyrelatedcomplaintComponent],
  entryComponents: [qyrelatedcomplaintComponent]
})
export class qycomplaintmasterModule { }
