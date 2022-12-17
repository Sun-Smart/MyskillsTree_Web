import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boprocesstaskComponent } from './boprocesstask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'boprocesstasks', children: [
      { path: '', component: boprocesstaskComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: boprocesstaskComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: boprocesstaskComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
