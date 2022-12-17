import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpproductfeatureparameterComponent } from './erpproductfeatureparameter.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpproductfeatureparameters', children: [
      { path: '', component: erpproductfeatureparameterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpproductfeatureparameterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
