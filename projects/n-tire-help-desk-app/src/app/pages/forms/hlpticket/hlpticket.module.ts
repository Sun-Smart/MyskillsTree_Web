import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './hlpticket.routing';
import { hlpticketComponent } from './hlpticket.component';
import { hlpticketdetailComponent } from '../hlpticketdetail/hlpticketdetail.component';
import { hlpplannedactionComponent } from '../hlpplannedaction/hlpplannedaction.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule, boreportviewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [hlpticketComponent, hlpticketdetailComponent,hlpplannedactionComponent],
  entryComponents: [ hlpticketdetailComponent,hlpplannedactionComponent]
})
export class hlpticketModule { }
