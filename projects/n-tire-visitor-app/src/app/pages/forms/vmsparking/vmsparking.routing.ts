import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vmsparkingComponent } from './vmsparking.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'vmsparkings', children: [
      { path: '', component: vmsparkingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: vmsparkingComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
