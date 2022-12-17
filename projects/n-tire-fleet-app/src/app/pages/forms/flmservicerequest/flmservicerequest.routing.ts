import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { flmservicerequestComponent } from './flmservicerequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'flmservicerequests', children: [
      { path: '', component: flmservicerequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: flmservicerequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
