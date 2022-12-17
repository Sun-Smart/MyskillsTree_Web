import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bomeetingComponent } from './bomeeting.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bomeetings', children: [
      { path: '', component: bomeetingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bomeetingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bomeetingComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
