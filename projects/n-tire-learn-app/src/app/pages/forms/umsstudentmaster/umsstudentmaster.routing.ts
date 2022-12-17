import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { umsstudentmasterComponent } from './umsstudentmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'umsstudentmasters', children: [
      { path: '', component: umsstudentmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: umsstudentmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
