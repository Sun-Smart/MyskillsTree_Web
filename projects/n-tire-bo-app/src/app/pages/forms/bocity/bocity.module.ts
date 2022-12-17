import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bocity.routing';
import { bocityComponent } from './bocity.component';
import { bolocationModule } from '../bolocation/bolocation.module';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,bolocationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bocityComponent]
})
export class bocityModule { }
