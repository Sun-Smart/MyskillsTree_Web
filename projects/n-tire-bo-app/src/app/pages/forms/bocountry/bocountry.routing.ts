import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bocountryComponent } from './bocountry.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bocountries', children: [
      { path: '', component: bocountryComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bocountryComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bocountryComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
