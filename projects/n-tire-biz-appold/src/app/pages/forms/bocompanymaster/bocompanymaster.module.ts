import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bocompanymaster.routing';
import { bocompanymasterComponent } from './bocompanymaster.component';


import { bocompanyholidayModule } from '../bocompanyholiday/bocompanyholiday.module';
import { bofinancialyearModule } from '../bofinancialyear/bofinancialyear.module';
import { bouserrolemasterModule } from '../bouserrolemaster/bouserrolemaster.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule, bocompanyholidayModule, bofinancialyearModule, bouserrolemasterModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bocompanymasterComponent]
})
export class bocompanymasterModule { }
