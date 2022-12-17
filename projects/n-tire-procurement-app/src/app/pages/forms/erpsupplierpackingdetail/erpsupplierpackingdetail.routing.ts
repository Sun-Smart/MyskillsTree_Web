import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpsupplierpackingdetailComponent } from './erpsupplierpackingdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpsupplierpackingdetails', children: [
      { path: '', component: erpsupplierpackingdetailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpsupplierpackingdetailComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
