import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { prjprojectbillingComponent } from './prjprojectbilling.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'prjprojectbillings', children: [
      { path: '', component: prjprojectbillingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: prjprojectbillingComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
