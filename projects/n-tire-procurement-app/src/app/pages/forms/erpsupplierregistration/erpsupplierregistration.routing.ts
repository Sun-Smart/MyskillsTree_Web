import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpsupplierregistrationComponent } from './erpsupplierregistration.component';

const routes: Routes = [
  {
    path: 'erpsupplierregistrations', children: [
      { path: '', component: erpsupplierregistrationComponent },
      { path: 'edit/:id', component: erpsupplierregistrationComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
