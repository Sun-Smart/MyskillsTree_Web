import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../../../../n-tire-bo-app/src/app/appcommon.module';
import { boreportviewerModule } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './bomenumaster.routing';
import { bomenumasterComponent } from './bomenumaster.component';
import { bomenuactionModule } from '../bomenuaction/bomenuaction.module';


@NgModule({
  exports: [
    NgCommonModule,
    
    bomenumasterComponent
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule,bomenuactionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [bomenumasterComponent]
})
export class bomenumasterModule { }
