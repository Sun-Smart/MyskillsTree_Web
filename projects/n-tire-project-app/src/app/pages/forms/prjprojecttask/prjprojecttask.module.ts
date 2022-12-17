import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './prjprojecttask.routing';
import { prjprojecttaskComponent } from './prjprojecttask.component';
import { bofactModule } from '../bofact/bofact.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, bofactModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [prjprojecttaskComponent]
})
export class prjprojecttaskModule { }
