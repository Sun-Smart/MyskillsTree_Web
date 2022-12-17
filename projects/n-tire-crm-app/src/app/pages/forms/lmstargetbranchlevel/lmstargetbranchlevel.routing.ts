import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmstargetbranchlevelListComponent } from './lmstargetbranchlevel.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'lmstargetbranchlevellists', children: [
      { path: '', component: lmstargetbranchlevelListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: ':id', component: lmstargetbranchlevelListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: lmstargetbranchlevelListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
