import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './prjtestrun.routing';
import { prjtestrunComponent } from './prjtestrun.component';
import { prjtestrundetailComponent } from './prjtestrundetail.component';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [prjtestrunComponent, prjtestrundetailComponent],
  entryComponents: [prjtestrundetailComponent]
})
export class prjtestrunModule { }
