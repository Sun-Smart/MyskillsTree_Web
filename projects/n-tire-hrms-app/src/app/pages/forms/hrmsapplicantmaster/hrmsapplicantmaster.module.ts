import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsapplicantmaster.routing';
import { hrmsapplicantmasterComponent } from './hrmsapplicantmaster.component';
import { hrmsapplicanteducationComponent } from './hrmsapplicanteducation.component';
import { hrmsapplicantskillComponent } from './hrmsapplicantskill.component';
import { hrmsapplicantcareerComponent } from './hrmsapplicantcareer.component';
import { hrmsmprapplicantComponent } from './hrmsmprapplicant.component';
import { hrmsapplicantofferComponent } from './hrmsapplicantoffer.component';
import { hrmsinterviewscheduleModule } from '../hrmsinterviewschedule/hrmsinterviewschedule.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, hrmsinterviewscheduleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsapplicantmasterComponent, hrmsapplicantofferComponent, hrmsapplicanteducationComponent, hrmsapplicantskillComponent, hrmsapplicantcareerComponent, hrmsmprapplicantComponent],
  entryComponents: [hrmsapplicanteducationComponent, hrmsapplicantofferComponent, hrmsapplicantskillComponent, hrmsapplicantcareerComponent, hrmsmprapplicantComponent]
})
export class hrmsapplicantmasterModule { }
