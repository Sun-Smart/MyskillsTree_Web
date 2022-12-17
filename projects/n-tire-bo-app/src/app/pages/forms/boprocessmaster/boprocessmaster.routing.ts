import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boprocessmasterComponent } from './boprocessmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'boprocessmasters', children: [
      { path: '', component: boprocessmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: boprocessmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: boprocessmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
