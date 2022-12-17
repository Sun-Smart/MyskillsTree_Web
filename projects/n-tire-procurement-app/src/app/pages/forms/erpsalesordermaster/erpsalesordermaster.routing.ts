import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpsalesordermasterComponent } from './erpsalesordermaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpsalesordermasters', children: [
      { path: '', component: erpsalesordermasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpsalesordermasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
