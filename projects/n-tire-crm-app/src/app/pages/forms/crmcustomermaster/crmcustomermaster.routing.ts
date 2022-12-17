import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { crmcustomermasterComponent } from './crmcustomermaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'crmcustomermasters', children: [
      { path: '', component: crmcustomermasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: crmcustomermasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
