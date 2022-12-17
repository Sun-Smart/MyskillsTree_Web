import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hlpservicelevel.routing';
import { hlpservicelevelComponent } from './hlpservicelevel.component';
import { hlpslapriorityComponent } from '../hlpslapriority/hlpslapriority.component';
import { hlpslasupporthourComponent } from '../hlpslasupporthour/hlpslasupporthour.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hlpservicelevelComponent,hlpslasupporthourComponent],
  entryComponents:[hlpservicelevelComponent,hlpslasupporthourComponent]
})
export class hlpservicelevelModule { }
