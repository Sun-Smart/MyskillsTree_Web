import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-biz-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bomasterdata.routing';
import { bomasterdataComponent } from './bomasterdata.component';
import { bosubcategorymasterModule } from '../bosubcategorymaster/bosubcategorymaster.module';


@NgModule({
  exports: [
    NgCommonModule,
    bosubcategorymasterModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule, bosubcategorymasterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bomasterdataComponent]
})
export class bomasterdataModule { }
