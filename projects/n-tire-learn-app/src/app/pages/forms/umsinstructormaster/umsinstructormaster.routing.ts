import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { umsinstructormasterComponent } from './umsinstructormaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'umsinstructormasters', children: [
      { path: '', component: umsinstructormasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: umsinstructormasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
