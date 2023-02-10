import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgCommonModule } from '../../../appcommon.module';
import { boforumComponent } from './boforum.component';



@NgModule({

  imports: [
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [boforumComponent]
})
export class BoforumModule { }
