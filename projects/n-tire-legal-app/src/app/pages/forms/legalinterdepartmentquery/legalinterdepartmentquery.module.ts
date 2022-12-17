import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './legalinterdepartmentquery.routing';
import { legalinterdepartmentqueryComponent } from './legalinterdepartmentquery.component';
import { legalinterdepartmentqueryresponseComponent } from '../legalinterdepartmentqueryresponse/legalinterdepartmentqueryresponse.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule,
    boreportviewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [legalinterdepartmentqueryComponent, legalinterdepartmentqueryresponseComponent],
  entryComponents: [legalinterdepartmentqueryresponseComponent]
})
export class legalinterdepartmentqueryModule { }
