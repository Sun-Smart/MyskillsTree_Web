import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erptenderquotationmasterComponent } from './erptenderquotationmaster.component';

const routes: Routes = [
  {
    path: 'erptenderquotationmasters', children: [
      { path: '', component: erptenderquotationmasterComponent },
      { path: 'edit/:id', component: erptenderquotationmasterComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
