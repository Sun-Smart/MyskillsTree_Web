import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsdependantdetailComponent } from './hrmsdependantdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsdependantdetails', children: [
      { path: '', component: hrmsdependantdetailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsdependantdetailComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
