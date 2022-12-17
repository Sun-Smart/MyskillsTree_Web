import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erptendersupplierresponseComponent } from './erptendersupplierresponse.component';

const routes: Routes = [
  {
    path: 'erptendersupplierresponses', children: [
      { path: '', component: erptendersupplierresponseComponent },
      { path: 'edit/:id', component: erptendersupplierresponseComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
