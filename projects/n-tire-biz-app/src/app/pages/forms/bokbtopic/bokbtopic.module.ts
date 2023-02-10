import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bokbtopicComponent } from './bokbtopic.component';



@NgModule({

  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bokbtopicComponent]
})
export class BokbtopicModule { }
