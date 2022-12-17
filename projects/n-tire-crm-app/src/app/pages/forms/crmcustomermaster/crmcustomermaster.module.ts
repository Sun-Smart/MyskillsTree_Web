import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './crmcustomermaster.routing';
import { crmcustomermasterComponent } from './crmcustomermaster.component';
import { crmcustomerkycmasterComponent } from './crmcustomerkycmaster.component';
import { crmcustomeraccountmasterModule } from '../crmcustomeraccountmaster/crmcustomeraccountmaster.module';
import { ecmcustomerbasketModule } from '../../../../../../n-tire-commerce-app/src/app/pages/forms/ecmcustomerbasket/ecmcustomerbasket.module';
import { ecmreviewComponent } from './ecmreview.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,
    crmcustomeraccountmasterModule,
    ecmcustomerbasketModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [crmcustomermasterComponent, crmcustomerkycmasterComponent,ecmreviewComponent],
  entryComponents: [crmcustomerkycmasterComponent,ecmreviewComponent]
})
export class crmcustomermasterModule { }
