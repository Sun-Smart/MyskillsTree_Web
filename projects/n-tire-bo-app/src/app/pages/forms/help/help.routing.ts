import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseMenuComponent } from './purchasemenu/purchasemenu.component';

const routes: Routes = [
  {
    path: 'purchasemenu', children: [
      { path: '', component: PurchaseMenuComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
