import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vmsworkplacerequestComponent } from './vmsworkplacerequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'vmsworkplacerequests', children: [
      { path: '', component: vmsworkplacerequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: vmsworkplacerequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
