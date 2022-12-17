import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boremindermasterComponent } from './boremindermaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'boremindermasters', children: [
      { path: '', component: boremindermasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: boremindermasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: boremindermasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
