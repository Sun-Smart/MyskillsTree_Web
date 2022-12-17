import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bofactComponent } from './bofact.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bofacts', children: [
      { path: '', component: bofactComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bofactComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bofactComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
