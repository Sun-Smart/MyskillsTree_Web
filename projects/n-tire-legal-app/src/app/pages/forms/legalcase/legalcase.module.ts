import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './legalcase.routing';
import { legalcaseComponent } from './legalcase.component';
import { legalcaseprocessdetailComponent } from '../legalcaseprocessdetail/legalcaseprocessdetail.component';
import { legalcommunicationdetailComponent } from '../legalcommunicationdetail/legalcommunicationdetail.component';

import { legalcasepartydetailComponent } from '../legalcasepartydetail/legalcasepartydetail.component';
import { legalfreenoteComponent } from '../legalfreenote/legalfreenote.component';
import { legalcaseinterimorderComponent } from '../legalcaseinterimorder/legalcaseinterimorder.component';
import { legaltaskmasterModule } from '../legaltaskmaster/legaltaskmaster.module';

import { legalcaseagainstemployeeComponent } from '../legalcaseagainstemployee/legalcaseagainstemployee.component';
import { legalcaselawyerComponent } from '../legalcaselawyer/legalcaselawyer.component';
import { legaltaskmasterComponent } from '../legaltaskmaster/legaltaskmaster.component';
import { legalcasehearingComponent } from '../legalcasehearing/legalcasehearing.component';

import { boexpenseComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boexpense/boexpense.component';
import { bokbmasterComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/bokbmaster/bokbmaster.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule, legaltaskmasterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [legalcaseComponent, legalcaseagainstemployeeComponent,legalcaselawyerComponent,legaltaskmasterComponent,boexpenseComponent, bokbmasterComponent, legalcaseinterimorderComponent, legalcaseprocessdetailComponent, legalcasepartydetailComponent, legalcommunicationdetailComponent, legalfreenoteComponent,legalcasehearingComponent],
  entryComponents: [legalcaseagainstemployeeComponent,legalcaselawyerComponent,legaltaskmasterComponent,bokbmasterComponent, boexpenseComponent, legalcaseinterimorderComponent, legalcaseprocessdetailComponent, legalcasepartydetailComponent, legalcommunicationdetailComponent, legalfreenoteComponent,legalcasehearingComponent]
})
export class legalcaseModule { }
