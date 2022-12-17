import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hmsvaccinationmasterComponent } from './hmsvaccinationmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hmsvaccinationmasters', children: [
      { path: '', component: hmsvaccinationmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hmsvaccinationmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
