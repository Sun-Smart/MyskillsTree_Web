import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { flmtaskComponent } from './flmtask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'flmtasks', children: [
      { path: '', component: flmtaskComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: flmtaskComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
