import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hrmsodrequest.routing';
import { hrmsodrequestComponent } from './hrmsodrequest.component';
import { hrmsodclaimComponent } from './hrmsodclaim.component';
import { hrmsodtravelComponent } from './hrmsodtravel.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hrmsodrequestComponent, hrmsodclaimComponent, hrmsodtravelComponent],
  entryComponents: [hrmsodclaimComponent, hrmsodtravelComponent]
})
export class hrmsodrequestModule { }
