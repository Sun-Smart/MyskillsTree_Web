import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './lmsmaster.routing';
import { lmsmasterComponent } from './lmsmaster.component';

import { lmscorporatesecondarycontactModule } from '../lmscorporatesecondarycontact/lmscorporatesecondarycontact.module';

import { lmsopportunityModule } from '../lmsopportunity/lmsopportunity.module';
import { lmscallModule } from '../lmscall/lmscall.module';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, lmscorporatesecondarycontactModule, lmsopportunityModule, lmscallModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [lmsmasterComponent]
})
export class lmsmasterModule { }
