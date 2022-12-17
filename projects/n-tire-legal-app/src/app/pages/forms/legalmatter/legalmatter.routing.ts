import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { legalmatterComponent } from './legalmatter.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'legalmatters', children: [
      { path: '', component: legalmatterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: legalmatterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
