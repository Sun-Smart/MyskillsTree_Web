import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './crmcustomeraccountmaster.routing';
import { crmcustomeraccountmasterComponent } from './crmcustomeraccountmaster.component';
import { crmcustomeraccounttransactionComponent } from './crmcustomeraccounttransaction.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [crmcustomeraccountmasterComponent, crmcustomeraccounttransactionComponent],
  entryComponents: [crmcustomeraccounttransactionComponent]
})
export class crmcustomeraccountmasterModule { }
