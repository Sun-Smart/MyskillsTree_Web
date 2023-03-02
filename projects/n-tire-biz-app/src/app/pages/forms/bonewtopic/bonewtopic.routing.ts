import { Routes, RouterModule } from '@angular/router';
import { BonewtopicComponent } from './bonewtopic.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
import { ModuleWithProviders } from '@angular/core';
const routes: Routes = [
  { path: 'bokbtopics', children: [
    { path: '', component: BonewtopicComponent},
    { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: BonewtopicComponent,canActivate:[CanDeactivateGuard]},
    { path: 'view/:viewid', pathMatch: 'prefix', component: BonewtopicComponent,canActivate:[CanDeactivateGuard]},
    { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: BonewtopicComponent,canActivate:[CanDeactivateGuard]},
    { path: 'edit/:id', component: BonewtopicComponent,canActivate:[CanDeactivateGuard]},
    { path: 'edit/:id/source/:sourcekey/:sourceid', component: BonewtopicComponent,canActivate:[CanDeactivateGuard]}
]},
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
