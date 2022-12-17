import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmstargetorglevelListComponent } from './lmstargetorglevel.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'lmstargetorglevellists', children: [
      { path: '', component: lmstargetorglevelListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: ':id', component: lmstargetorglevelListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: lmstargetorglevelListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
