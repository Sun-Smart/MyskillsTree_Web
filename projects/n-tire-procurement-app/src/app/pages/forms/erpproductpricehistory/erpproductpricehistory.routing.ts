import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpproductpricehistoryComponent } from './erpproductpricehistory.component';

const routes: Routes = [
  {
    path: 'erpproductpricehistories', children: [
      { path: '', component: erpproductpricehistoryComponent },
      { path: 'edit/:id', component: erpproductpricehistoryComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
