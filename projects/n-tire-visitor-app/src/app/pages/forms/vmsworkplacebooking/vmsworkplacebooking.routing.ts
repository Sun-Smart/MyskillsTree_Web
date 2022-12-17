import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vmsworkplacebookingComponent } from './vmsworkplacebooking.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'vmsworkplacebookings', children: [
      { path: '', component: vmsworkplacebookingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: vmsworkplacebookingComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
