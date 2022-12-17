import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bostateComponent } from './bostate.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bostates', children: [
      { path: '', component: bostateComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bostateComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bostateComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
