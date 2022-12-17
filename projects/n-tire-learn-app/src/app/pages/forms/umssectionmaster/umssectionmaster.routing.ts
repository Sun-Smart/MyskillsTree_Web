import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { umssectionmasterComponent } from './umssectionmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'umssectionmasters', children: [
      { path: '', component: umssectionmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: umssectionmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
