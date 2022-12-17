import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmssalarymasterComponent } from './hrmssalarymaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmssalarymasters', children: [
      { path: '', component: hrmssalarymasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmssalarymasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
