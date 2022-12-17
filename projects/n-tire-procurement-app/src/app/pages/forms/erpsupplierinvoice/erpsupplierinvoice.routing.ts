import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpsupplierinvoiceComponent } from './erpsupplierinvoice.component';

const routes: Routes = [
  {
    path: 'erpsupplierinvoices', children: [
      { path: '', component: erpsupplierinvoiceComponent },
      { path: 'edit/:id', component: erpsupplierinvoiceComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
