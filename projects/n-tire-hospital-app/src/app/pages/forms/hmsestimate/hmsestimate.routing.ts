import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hmsestimateComponent } from './hmsestimate.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hmsestimates', children: [
      { path: '', component: hmsestimateComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hmsestimateComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
