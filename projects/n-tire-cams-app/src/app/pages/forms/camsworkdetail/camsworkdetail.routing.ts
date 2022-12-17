import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { camsworkdetailComponent } from './camsworkdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'camsworkdetails', children: [
      { path: '', component: camsworkdetailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camsworkdetailComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
