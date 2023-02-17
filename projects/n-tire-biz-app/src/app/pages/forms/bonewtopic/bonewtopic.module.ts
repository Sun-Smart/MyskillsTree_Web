import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonewtopicComponent } from './bonewtopic.component';
import { BonewtopicRoutes } from './bonewtopic.routing';
import { bokbtopicService } from '../../../service/bokbtopic.service';
import { SharedService } from 'projects/n-tire-bo-app/src/app/service/shared.service';
@NgModule({
  imports: [
    CommonModule,
    BonewtopicRoutes
  ],
  declarations: [BonewtopicComponent],
  providers: [bokbtopicService, SharedService]
})
export class BonewtopicModule { }
             