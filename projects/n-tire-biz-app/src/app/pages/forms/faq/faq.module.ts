import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { routing } from './faq.routing';
import { ThemeService } from 'projects/n-tire-bo-app/src/app/pages/core/services/theme.service';
import { bofaqService } from '../../../service/bofaq.service';
import { SharedService } from 'projects/n-tire-bo-app/src/app/service/shared.service';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [FaqComponent],
  providers: [ThemeService, bofaqService, SharedService],
})
export class FaqModule { }
