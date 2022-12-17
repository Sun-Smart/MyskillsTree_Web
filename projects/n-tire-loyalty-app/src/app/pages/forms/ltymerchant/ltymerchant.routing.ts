import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ltymerchantComponent } from './ltymerchant.component';

const routes: Routes = [
  {
    path: 'ltymerchants', children: [
      { path: '', component: ltymerchantComponent },
      { path: 'edit/:id', component: ltymerchantComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
