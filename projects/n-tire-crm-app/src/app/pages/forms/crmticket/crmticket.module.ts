import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './crmticket.routing';
import { crmticketComponent } from './crmticket.component';
import { crmticketdetailComponent } from './crmticketdetail.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [crmticketComponent, crmticketdetailComponent],
  entryComponents: [crmticketdetailComponent]
})
export class crmticketModule { }
