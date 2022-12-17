import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bokbmasterComponent } from './bokbmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bokbmasters', children: [
      { path: '', component: bokbmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bokbmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bokbmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
