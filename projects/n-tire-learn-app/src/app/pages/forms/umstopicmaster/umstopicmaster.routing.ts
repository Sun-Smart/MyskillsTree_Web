import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { umstopicmasterComponent } from './umstopicmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'umstopicmasters', children: [
      { path: '', component: umstopicmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: umstopicmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
