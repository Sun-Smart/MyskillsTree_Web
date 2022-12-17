import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { legalcustomerinvoiceComponent } from './legalcustomerinvoice.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'legalcustomerinvoices', children: [
      { path: '', component: legalcustomerinvoiceComponent },
      { path: 'edit/:id', component: legalcustomerinvoiceComponent },
      { path: 'view/:viewid', component: legalcustomerinvoiceComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
