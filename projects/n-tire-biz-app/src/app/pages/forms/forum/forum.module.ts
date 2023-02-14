import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutes } from './forum.routing';
import { ThemeService } from 'projects/n-tire-bo-app/src/app/pages/core/services/theme.service';
import { boforumService } from '../../../service/boforum.service';
import { SharedService } from 'projects/n-tire-bo-app/src/app/service/shared.service';

@NgModule({
  imports: [
    CommonModule,
    ForumRoutes
  ],
  declarations: [ForumComponent],
  providers: [boforumService, SharedService]
})
export class ForumModule { }
