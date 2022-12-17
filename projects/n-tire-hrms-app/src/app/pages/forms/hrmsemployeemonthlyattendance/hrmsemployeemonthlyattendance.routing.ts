import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsemployeemonthlyattendanceListComponent } from './hrmsemployeemonthlyattendance.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsemployeemonthlyattendances', children: [
      { path: '', component: hrmsemployeemonthlyattendanceListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsemployeemonthlyattendanceListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
