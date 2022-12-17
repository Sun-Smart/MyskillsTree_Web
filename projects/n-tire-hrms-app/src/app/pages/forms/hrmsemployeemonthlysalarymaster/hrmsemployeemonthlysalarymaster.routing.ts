import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsemployeemonthlysalarymasterComponent } from './hrmsemployeemonthlysalarymaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsemployeemonthlysalarymasters', children: [
      { path: '', component: hrmsemployeemonthlysalarymasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsemployeemonthlysalarymasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routinghrmsemployeemonthlysalarymaster: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
