import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vmsworkplaceComponent } from './vmsworkplace.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'vmsworkplaces', children: [
      { path: '', component: vmsworkplaceComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: vmsworkplaceComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
