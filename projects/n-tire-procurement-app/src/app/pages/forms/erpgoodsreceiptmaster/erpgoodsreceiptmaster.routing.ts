import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpgoodsreceiptmasterComponent } from './erpgoodsreceiptmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpgoodsreceiptmasters', children: [
      { path: '', component: erpgoodsreceiptmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpgoodsreceiptmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
