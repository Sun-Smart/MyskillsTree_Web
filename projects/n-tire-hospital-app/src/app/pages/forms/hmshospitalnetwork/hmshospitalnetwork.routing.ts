import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hmshospitalnetworkComponent } from './hmshospitalnetwork.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hmshospitalnetworks', children: [
      { path: '', component: hmshospitalnetworkComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hmshospitalnetworkComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
