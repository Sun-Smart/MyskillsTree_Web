import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './automaster.routing';
import { automasterComponent } from './automaster.component';
import { autodetailModule } from '../autodetail/autodetail.module';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,autodetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [automasterComponent]
})
export class automasterModule { }
