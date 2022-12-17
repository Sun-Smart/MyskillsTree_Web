import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erptaxmasterComponent } from './erptaxmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erptaxmasters', children: [
      { path: '', component: erptaxmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erptaxmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
