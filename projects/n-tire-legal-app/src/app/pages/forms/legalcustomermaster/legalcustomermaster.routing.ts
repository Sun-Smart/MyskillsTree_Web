import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { legalcustomermasterComponent } from './legalcustomermaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'legalcustomermasters', children: [
      { path: '', component: legalcustomermasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: legalcustomermasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
