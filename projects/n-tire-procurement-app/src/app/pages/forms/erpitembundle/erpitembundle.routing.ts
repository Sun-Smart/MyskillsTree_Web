import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpitembundleComponent } from './erpitembundle.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpitembundles', children: [
      { path: '', component: erpitembundleComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpitembundleComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
