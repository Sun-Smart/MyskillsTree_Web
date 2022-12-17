import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpsupplierpackingmasterComponent } from './erpsupplierpackingmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpsupplierpackingmasters', children: [
      { path: '', component: erpsupplierpackingmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpsupplierpackingmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
