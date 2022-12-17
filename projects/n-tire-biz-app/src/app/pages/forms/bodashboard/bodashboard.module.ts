import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bodashboard.routing';
import { bodashboardComponent } from './bodashboard.component';
import { bodashboarddetailComponent } from '../bodashboarddetail/bodashboarddetail.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bodashboardComponent,bodashboarddetailComponent],
  entryComponents:[bodashboarddetailComponent]
})
export class bodashboardModule { }
