import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bocountry.routing';
import { bocountryComponent } from './bocountry.component';
import { bostateComponent } from '../bostate/bostate.component';
import { bocityComponent } from '../bocity/bocity.component';
import { bolocationComponent } from '../bolocation/bolocation.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bocountryComponent,bostateComponent,bocityComponent,bolocationComponent]
})
export class bocountryModule { }
