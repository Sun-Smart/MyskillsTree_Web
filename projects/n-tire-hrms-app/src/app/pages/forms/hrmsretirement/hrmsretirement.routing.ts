import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsretirementComponent } from './hrmsretirement.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsretirements', children: [
      { path: '', component: hrmsretirementComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsretirementComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
