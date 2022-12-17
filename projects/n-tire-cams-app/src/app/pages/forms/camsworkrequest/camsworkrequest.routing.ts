import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { camsworkrequestComponent } from './camsworkrequest.component';

const routes: Routes = [
  {path:'',component: camsworkrequestComponent},
  {
 
    path: 'camsworkrequests', children: [
      { path: '', component: camsworkrequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camsworkrequestComponent, canDeactivate: [CanDeactivateGuard]},
      { path: 'edit/:id/source/:sourcekey/:sourceid', component: camsworkrequestComponent, canDeactivate: [CanDeactivateGuard]},
      { path: 'view/:viewid', component: camsworkrequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
