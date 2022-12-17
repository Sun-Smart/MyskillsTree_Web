import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsemployeesalarymasterComponent } from './hrmsemployeesalarymaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsemployeesalarymasters', children: [
      { path: '', component: hrmsemployeesalarymasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsemployeesalarymasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
