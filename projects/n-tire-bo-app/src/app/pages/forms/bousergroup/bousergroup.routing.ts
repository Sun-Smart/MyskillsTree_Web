import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bousergroupComponent } from './bousergroup.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bousergroups', children: [
      { path: '', component: bousergroupComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bousergroupComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bousergroupComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
