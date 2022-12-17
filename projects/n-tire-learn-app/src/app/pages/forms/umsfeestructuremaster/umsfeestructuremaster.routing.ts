import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { umsfeestructuremasterComponent } from './umsfeestructuremaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'umsfeestructuremasters', children: [
      { path: '', component: umsfeestructuremasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: umsfeestructuremasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
