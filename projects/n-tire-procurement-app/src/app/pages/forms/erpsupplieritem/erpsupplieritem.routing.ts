import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpsupplieritemComponent } from './erpsupplieritem.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpsupplieritems', children: [
      { path: '', component: erpsupplieritemComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpsupplieritemComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
