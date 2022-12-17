import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsinductionscheduleComponent } from './hrmsinductionschedule.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsinductionschedules', children: [
      { path: '', component: hrmsinductionscheduleComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsinductionscheduleComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
