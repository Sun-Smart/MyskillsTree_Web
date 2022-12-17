import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erplocationmasterComponent } from './erplocationmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erplocationmasters', children: [
      { path: '', component: erplocationmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erplocationmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
