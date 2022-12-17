import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erppartnercommissionComponent } from './erppartnercommission.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erppartnercommissions', children: [
      { path: '', component: erppartnercommissionComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erppartnercommissionComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
