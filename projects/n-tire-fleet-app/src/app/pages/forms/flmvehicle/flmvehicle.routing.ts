import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { flmvehicleComponent } from './flmvehicle.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'flmvehicles', children: [
      { path: '', component: flmvehicleComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: flmvehicleComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
