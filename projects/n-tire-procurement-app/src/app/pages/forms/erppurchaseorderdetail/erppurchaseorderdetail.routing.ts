import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erppurchaseorderdetailComponent } from './erppurchaseorderdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erppurchaseorderdetails', children: [
      { path: '', component: erppurchaseorderdetailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erppurchaseorderdetailComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
