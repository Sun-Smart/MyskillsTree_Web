import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './qygrievancemaster.routing';
import { qygrievancemasterComponent } from './qygrievancemaster.component';
import { qyrelatedgrievanceComponent } from '../qyrelatedgrievance/qyrelatedgrievance.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [qygrievancemasterComponent, qyrelatedgrievanceComponent],
  entryComponents: [qyrelatedgrievanceComponent]
})
export class qygrievancemasterModule { }
