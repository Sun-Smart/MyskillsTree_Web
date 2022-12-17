import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmssubordinatedetailComponent } from './hrmssubordinatedetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmssubordinatedetails', children: [
      { path: '', component: hrmssubordinatedetailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmssubordinatedetailComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
