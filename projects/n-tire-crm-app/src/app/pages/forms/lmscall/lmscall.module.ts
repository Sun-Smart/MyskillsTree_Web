import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module'
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './lmscall.routing';
import { lmscallComponent } from './lmscall.component';
import { lmstaskModule } from '../lmstask/lmstask.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, lmstaskModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [lmscallComponent]
})
export class lmscallModule { }
