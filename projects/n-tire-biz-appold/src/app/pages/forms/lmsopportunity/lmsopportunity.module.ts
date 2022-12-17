import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './lmsopportunity.routing';
import { lmsopportunityComponent } from './lmsopportunity.component';

import { lmsquoteModule } from '../lmsquote/lmsquote.module';
import { lmscallModule } from '../lmscall/lmscall.module';
import { lmsopportunityproductModule } from '../lmsopportunityproduct/lmsopportunityproduct.module';
import { lmsreminderModule } from '../lmsreminder/lmsreminder.module';
import { lmssecondarycontactModule } from '../lmssecondarycontact/lmssecondarycontact.module';
import { boexpenseModule } from '../boexpense/boexpense.module';



@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, lmsquoteModule, lmscallModule, lmsopportunityproductModule, lmsreminderModule, lmssecondarycontactModule, boexpenseModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [lmsopportunityComponent]
})
export class lmsopportunityModule { }
