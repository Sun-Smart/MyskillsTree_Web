import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpcustomerinvoiceComponent } from './erpcustomerinvoice.component';

const routes: Routes = [
  {
    path: 'erpcustomerinvoices', children: [
      { path: '', component: erpcustomerinvoiceComponent },
      { path: 'edit/:id', component: erpcustomerinvoiceComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
