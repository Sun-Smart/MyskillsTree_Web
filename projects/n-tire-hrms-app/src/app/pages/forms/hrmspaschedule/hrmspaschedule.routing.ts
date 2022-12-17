import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmspascheduleComponent } from './hrmspaschedule.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmspaschedules', children: [
      { path: '', component: hrmspascheduleComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmspascheduleComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
