import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpsupplierquotationmasterComponent } from './erpsupplierquotationmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpsupplierquotationmasters', children: [
      { path: '', component: erpsupplierquotationmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpsupplierquotationmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
