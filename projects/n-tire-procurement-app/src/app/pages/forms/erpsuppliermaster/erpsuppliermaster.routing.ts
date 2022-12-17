import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpsuppliermasterComponent } from './erpsuppliermaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpsuppliermasters', children: [
      { path: '', component: erpsuppliermasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpsuppliermasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
