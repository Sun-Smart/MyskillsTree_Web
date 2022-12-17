import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsitadditionaltaxComponent } from './hrmsitadditionaltax.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsitadditionaltaxes', children: [
      { path: '', component: hrmsitadditionaltaxComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsitadditionaltaxComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
