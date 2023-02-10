import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ThemeService } from 'ng2-charts';
import { NgCommonModule } from '../../../appcommon.module';
import { bofaqComponent } from './bofaq.component';




@NgModule({

  imports: [
    NgCommonModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [bofaqComponent],
  providers:[ThemeService],
})
export class BofaqModule { }
