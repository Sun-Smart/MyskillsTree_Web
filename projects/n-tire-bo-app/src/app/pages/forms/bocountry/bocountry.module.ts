import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bocountry.routing';
import { bocountryComponent } from './bocountry.component';
import { bostateModule } from '../bostate/bostate.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,
    bostateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bocountryComponent]
})
export class bocountryModule { }
