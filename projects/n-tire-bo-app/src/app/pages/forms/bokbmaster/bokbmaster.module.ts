import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bokbmaster.routing';
import { bokbmasterComponent } from './bokbmaster.component';
import { bokbtopicModule } from '../bokbtopic/bokbtopic.module';

@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,bokbtopicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bokbmasterComponent]
})
export class bokbmasterModule { }
