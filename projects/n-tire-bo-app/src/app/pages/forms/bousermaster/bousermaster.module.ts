import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { routing } from './bousermaster.routing';
import { bousermasterComponent } from './bousermaster.component';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { bomenumasterComponent } from '../bomenumaster/bomenumaster.component';
import { bobranchmasterComponent } from '../bobranchmaster/bobranchmaster.component';

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
  declarations: [
    bousermasterComponent,
    bomenumasterComponent,
    bobranchmasterComponent
  ],
  entryComponents:[bomenumasterComponent,bobranchmasterComponent]
})
export class bousermasterModule { }
