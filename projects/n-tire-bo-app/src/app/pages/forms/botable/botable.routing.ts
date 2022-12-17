import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { botableComponent } from './botable.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'botables', children: [
      { path: '', component: botableComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: botableComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: botableComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
