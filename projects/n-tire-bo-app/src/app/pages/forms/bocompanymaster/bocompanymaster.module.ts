import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bocompanymaster.routing';
import { bocompanymasterComponent } from './bocompanymaster.component';

import { bocompanyholidayModule } from '../bocompanyholiday/bocompanyholiday.module';
import { bofinancialyearModule } from '../bofinancialyear/bofinancialyear.module';
import { bouserrolemasterModule } from '../bouserrolemaster/bouserrolemaster.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,bocompanyholidayModule,bofinancialyearModule,bouserrolemasterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bocompanymasterComponent]
})
export class bocompanymasterModule { }
