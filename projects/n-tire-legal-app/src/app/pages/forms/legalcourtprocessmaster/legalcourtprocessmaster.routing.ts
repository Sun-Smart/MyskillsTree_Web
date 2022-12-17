import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { legalcourtprocessmasterComponent } from './legalcourtprocessmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'legalcourtprocessmasters', children: [
      { path: '', component: legalcourtprocessmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: legalcourtprocessmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
