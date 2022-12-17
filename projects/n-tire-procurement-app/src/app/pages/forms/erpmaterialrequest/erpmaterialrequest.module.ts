import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { routing } from './erpmaterialrequest.routing';
import { erpmaterialrequestComponent } from './erpmaterialrequest.component';
import { erpmaterialrequestdetailModule } from '../erpmaterialrequestdetail/erpmaterialrequestdetail.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,erpmaterialrequestdetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [erpmaterialrequestComponent]
})
export class erpmaterialrequestModule { }
