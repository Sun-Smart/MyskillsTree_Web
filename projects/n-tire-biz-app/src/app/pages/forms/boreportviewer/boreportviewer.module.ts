
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';

import { routing } from './boreportviewer.routing';
import { boformviewerComponent } from './boformviewer.component';
import { dataComponent } from '../boreportdata/data.component';

@NgModule({
  exports: [
    dataComponent
  ],
  imports: [
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [dataComponent, boformviewerComponent],
  entryComponents: [dataComponent]
})
export class boreportviewerModule { }
