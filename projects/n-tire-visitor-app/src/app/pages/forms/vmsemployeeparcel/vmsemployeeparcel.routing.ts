import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vmsemployeeparcelComponent } from './vmsemployeeparcel.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'vmsemployeeparcels', children: [
      { path: '', component: vmsemployeeparcelComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: vmsemployeeparcelComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
