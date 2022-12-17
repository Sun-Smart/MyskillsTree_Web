import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './mstterm.routing';
import { msttermComponent } from './mstterm.component';
import { msttermnewComponent } from './msttermnew.component';
@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [msttermComponent, msttermnewComponent]
})
export class msttermModule { }
