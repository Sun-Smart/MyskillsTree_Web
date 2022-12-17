import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmseosmasterComponent } from './hrmseosmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmseosmasters', children: [
      { path: '', component: hrmseosmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmseosmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
