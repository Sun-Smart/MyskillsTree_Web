import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './prjprojectmaster.routing';
import { prjprojectmasterComponent } from './prjprojectmaster.component';
import { prjprojecttaskModule } from '../prjprojecttask/prjprojecttask.module';
import { prjexpenseModule } from '../prjexpense/prjexpense.module';
import { prjprojectdeliverableModule } from '../prjprojectdeliverable/prjprojectdeliverable.module';
import { prjprojectobjectiveModule } from '../prjprojectobjective/prjprojectobjective.module';
import { boremindermasterModule } from '../boremindermaster/boremindermaster.module';
import { prjtimecardModule } from '../prjtimecard/prjtimecard.module';
import { prjdocumentModule } from '../prjdocument/prjdocument.module';
import { bousermasterModule } from '../bousermaster/bousermaster.module';
import { prjprojectbillingModule } from '../prjprojectbilling/prjprojectbilling.module';
import { prjdailystandupModule } from '../prjdailystandup/prjdailystandup.module';
import { prjprojectchangeComponent } from './prjprojectchange.component';
import { prjprojectoutputComponent } from './prjprojectoutput.component';
import { prjprojectrequirementComponent } from './prjprojectrequirement.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,bousermasterModule,prjprojectbillingModule,prjdailystandupModule, prjtimecardModule, prjdocumentModule, prjprojecttaskModule, prjexpenseModule, prjprojectdeliverableModule, prjprojectobjectiveModule, boremindermasterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [prjprojectmasterComponent,prjprojectchangeComponent,prjprojectoutputComponent,prjprojectrequirementComponent],
  entryComponents: [prjprojectchangeComponent,prjprojectoutputComponent,prjprojectrequirementComponent]
})
export class prjprojectmasterModule { }
