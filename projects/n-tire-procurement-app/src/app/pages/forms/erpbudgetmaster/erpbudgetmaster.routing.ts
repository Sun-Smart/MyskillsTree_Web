import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpbudgetmasterComponent } from './erpbudgetmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpbudgetmasters', children: [
      { path: '', component: erpbudgetmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpbudgetmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
