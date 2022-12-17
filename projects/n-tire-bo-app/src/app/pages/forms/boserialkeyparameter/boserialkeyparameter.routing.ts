import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boserialkeyparameterComponent } from './boserialkeyparameter.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'boserialkeyparameters', children: [
      { path: '', component: boserialkeyparameterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: boserialkeyparameterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: boserialkeyparameterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
