import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erppurchaserequestComponent } from './erppurchaserequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erppurchaserequests', children: [
      { path: '', component: erppurchaserequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erppurchaserequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
