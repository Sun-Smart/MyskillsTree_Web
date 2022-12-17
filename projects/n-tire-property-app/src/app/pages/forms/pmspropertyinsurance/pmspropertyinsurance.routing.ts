import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { pmspropertyinsuranceComponent } from './pmspropertyinsurance.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'pmspropertyinsurances', children: [
      { path: '', component: pmspropertyinsuranceComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: pmspropertyinsuranceComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
