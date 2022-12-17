import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hmsward.routing';
import { hmswardComponent } from './hmsward.component';

import { hmsbedComponent } from './hmsbed.component';
import { hmswardinchargeComponent } from './hmswardincharge.component';
import { hmswardroundComponent } from './hmswardround.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hmswardComponent, hmsbedComponent, hmswardinchargeComponent, hmswardroundComponent],
  entryComponents: [hmsbedComponent, hmswardinchargeComponent, hmswardroundComponent]
})
export class hmswardModule { }
