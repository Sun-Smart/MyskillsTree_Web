import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpcontractordermasterComponent } from './erpcontractordermaster.component';

const routes: Routes = [
  {
    path: 'erpcontractordermasters', children: [
      { path: '', component: erpcontractordermasterComponent },
      { path: 'edit/:id', component: erpcontractordermasterComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
