import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsinterviewscheduleComponent } from './hrmsinterviewschedule.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsinterviewschedules', children: [
      { path: '', component: hrmsinterviewscheduleComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsinterviewscheduleComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
