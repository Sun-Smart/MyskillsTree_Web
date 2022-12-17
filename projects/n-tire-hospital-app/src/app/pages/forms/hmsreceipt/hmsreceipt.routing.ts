import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hmsreceiptComponent } from './hmsreceipt.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hmsreceipts', children: [
      { path: '', component: hmsreceiptComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hmsreceiptComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
