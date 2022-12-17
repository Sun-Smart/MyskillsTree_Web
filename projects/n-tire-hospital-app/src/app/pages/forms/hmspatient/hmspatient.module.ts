import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hmspatient.routing';

import { hmsadmissionComponent } from './hmsadmission.component';
import { hmspatientComponent } from './hmspatient.component';
import { hmsappointmentComponent } from './hmsappointment.component';
import { hmsconsentComponent } from './hmsconsent.component';
import { hmsinsuranceComponent } from './hmsinsurance.component';
import { hmslabresultComponent } from './hmslabresult.component';
import { hmsoperationComponent } from './hmsoperation.component';
import { hmspatientdischargeComponent } from './hmspatientdischarge.component';
import { hmspatientfollowupComponent } from './hmspatientfollowup.component';
import { hmspatientpaymentmasterComponent } from './hmspatientpaymentmaster.component';
import { hmspatientvaccinationComponent } from './hmspatientvaccination.component';
import { hmspatientvisitComponent } from './hmspatientvisit.component';
import { hmsreceiptComponent } from './hmsreceipt.component';
import { hmstreatmentComponent } from './hmstreatment.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hmspatientComponent, hmsadmissionComponent, hmsappointmentComponent, hmsconsentComponent, hmsinsuranceComponent, hmslabresultComponent, hmsoperationComponent,
    hmspatientdischargeComponent, hmspatientfollowupComponent, hmspatientpaymentmasterComponent, hmspatientvaccinationComponent, hmspatientvisitComponent, hmsreceiptComponent, hmstreatmentComponent
  ],
  entryComponents: [hmsadmissionComponent, hmsappointmentComponent, hmsconsentComponent, hmsinsuranceComponent, hmslabresultComponent, hmsoperationComponent,
    hmspatientdischargeComponent, hmspatientfollowupComponent, hmspatientpaymentmasterComponent, hmspatientvaccinationComponent, hmspatientvisitComponent, hmsreceiptComponent, hmstreatmentComponent]
})
export class hmspatientModule { }
