import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './lmsmaster.routing';
import { lmsmasterComponent } from './lmsmaster.component';

import { lmscorporatesecondarycontactComponent } from '../lmscorporatesecondarycontact/lmscorporatesecondarycontact.component';

import { lmsopportunityModule } from '../lmsopportunity/lmsopportunity.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule,
    lmsopportunityModule, boreportviewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [lmsmasterComponent, lmscorporatesecondarycontactComponent],
  entryComponents: [lmscorporatesecondarycontactComponent]
})
export class lmsmasterModule { }
