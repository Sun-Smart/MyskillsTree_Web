import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { automasterComponent } from './automaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'automasters', children: [
      { path: '', component: automasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: automasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: automasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
