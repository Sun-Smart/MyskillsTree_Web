import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bodashboard.routing';
import { bodashboardComponent } from './bodashboard.component';
import { bodashboarddetailModule } from '../bodashboarddetail/bodashboarddetail.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,bodashboarddetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bodashboardComponent]
})
export class bodashboardModule { }
