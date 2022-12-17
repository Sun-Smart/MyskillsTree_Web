import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bocityComponent } from './bocity.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bocities', children: [
      { path: '', component: bocityComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bocityComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bocityComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
