import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewskillsearchComponent } from './newskillsearch.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NewskillsearchComponent]
})
export class NewskillsearchModule { }
