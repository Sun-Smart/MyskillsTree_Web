import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './erpsalesordermaster.routing';
import { erpsalesordermasterComponent } from './erpsalesordermaster.component';
import { erpsalesorderdetailComponent } from './erpsalesorderdetail.component';
import { erpsalesorderpaymenttermComponent } from './erpsalesorderpaymentterm.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpsalesordermasterComponent, erpsalesorderdetailComponent, erpsalesorderpaymenttermComponent],
  entryComponents: [erpsalesorderdetailComponent, erpsalesorderpaymenttermComponent]
})
export class erpsalesordermasterModule { }
