import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpsupplierresponseComponent } from './erpsupplierresponse.component';

const routes: Routes = [
  {
    path: 'erpsupplierresponses', children: [
      { path: '', component: erpsupplierresponseComponent },
      { path: 'edit/:id', component: erpsupplierresponseComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
