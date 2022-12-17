import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsgrademasterComponent } from './hrmsgrademaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsgrademasters', children: [
      { path: '', component: hrmsgrademasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsgrademasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
