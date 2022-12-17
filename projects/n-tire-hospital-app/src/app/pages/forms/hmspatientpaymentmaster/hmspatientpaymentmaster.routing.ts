import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hmspatientpaymentmasterComponent } from './hmspatientpaymentmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hmspatientpaymentmasters', children: [
      { path: '', component: hmspatientpaymentmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hmspatientpaymentmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
