import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erppurchaseordermasterComponent } from './erppurchaseordermaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erppurchaseordermasters', children: [
      { path: '', component: erppurchaseordermasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erppurchaseordermasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
