import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { crmcustomerserviceComponent } from './crmcustomerservice.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'crmcustomerservices', children: [
      { path: '', component: crmcustomerserviceComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: crmcustomerserviceComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
