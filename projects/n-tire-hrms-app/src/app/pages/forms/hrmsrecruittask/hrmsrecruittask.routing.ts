import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsrecruittaskListComponent } from './hrmsrecruittask.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsrecruittasks', children: [
      { path: '', component: hrmsrecruittaskListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsrecruittaskListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
