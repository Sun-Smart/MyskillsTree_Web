import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erptenderquotationmaster.routing';
import { erptenderquotationmasterComponent } from './erptenderquotationmaster.component';
import { erptenderquotationdetailComponent } from './erptenderquotationdetail.component';
import { erptenderquotationanswerComponent } from './erptenderquotationanswer.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erptenderquotationmasterComponent, erptenderquotationdetailComponent, erptenderquotationanswerComponent],
  entryComponents: [erptenderquotationdetailComponent, erptenderquotationanswerComponent]
})
export class erptenderquotationmasterModule { }
