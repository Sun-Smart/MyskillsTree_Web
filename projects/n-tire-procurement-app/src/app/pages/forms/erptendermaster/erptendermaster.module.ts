import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erptendermaster.routing';
import { erptendermasterComponent } from './erptendermaster.component';
import { erptendercorrigendumComponent } from './erptendercorrigendum.component';
import { erptenderdetailComponent } from './erptenderdetail.component';
import { erptenderquestionComponent } from './erptenderquestion.component';
import { erptenderquotationmasterModule } from '../erptenderquotationmaster/erptenderquotationmaster.module';
import { erptendersupplierresponseModule } from '../erptendersupplierresponse/erptendersupplierresponse.module';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, erptenderquotationmasterModule, erptendersupplierresponseModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erptendermasterComponent, erptendercorrigendumComponent, erptenderdetailComponent, erptenderquestionComponent],
  entryComponents: [erptenderdetailComponent, erptendercorrigendumComponent, erptenderquestionComponent]
})
export class erptendermasterModule { }
