import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { pmemployeekpiListComponent } from './pmemployeekpi.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'pmemployeekpis', children: [
      { path: '', component: pmemployeekpiListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: pmemployeekpiListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
