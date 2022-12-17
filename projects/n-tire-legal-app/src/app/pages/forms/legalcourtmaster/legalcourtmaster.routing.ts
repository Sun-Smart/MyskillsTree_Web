import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { legalcourtmasterComponent } from './legalcourtmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'legalcourtmasters', children: [
      { path: '', component: legalcourtmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: legalcourtmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
