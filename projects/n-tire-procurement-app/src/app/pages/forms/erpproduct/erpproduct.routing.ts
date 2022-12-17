import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpproductComponent } from './erpproduct.component';

const routes: Routes = [
  {
    path: 'erpproducts', children: [
      { path: '', component: erpproductComponent },
      { path: 'edit/:id', component: erpproductComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
