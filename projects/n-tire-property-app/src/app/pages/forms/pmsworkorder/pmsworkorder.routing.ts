import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { pmsworkorderComponent } from './pmsworkorder.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'pmsworkorders', children: [
      { path: '', component: pmsworkorderComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: pmsworkorderComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
