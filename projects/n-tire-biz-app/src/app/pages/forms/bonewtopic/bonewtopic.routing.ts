import { Routes, RouterModule } from '@angular/router';
import { BonewtopicComponent } from './bonewtopic.component';

const routes: Routes = [
  { path: 'topic', children: [
    { path: '', component:  BonewtopicComponent}
  ] },
];

export const BonewtopicRoutes = RouterModule.forChild(routes);
