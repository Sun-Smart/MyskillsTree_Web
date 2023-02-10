import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCommonModule } from '../../../appcommon.module';
import { bokbmasterComponent } from 'projects/n-tire-bo-app/src/app/pages/forms/bokbmaster/bokbmaster.component';



@NgModule({

  imports: [
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bokbmasterComponent]
})
export class BokbmasterModule { }
