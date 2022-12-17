import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { pmsscheduleComponent } from './pmsschedule.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'pmsschedules', children: [
      { path: '', component: pmsscheduleComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: pmsscheduleComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
