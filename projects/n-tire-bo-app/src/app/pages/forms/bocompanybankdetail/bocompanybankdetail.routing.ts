import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bocompanybankdetailComponent } from './bocompanybankdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bocompanybankdetails', children: [
      { path: '', component: bocompanybankdetailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bocompanybankdetailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bocompanybankdetailComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
