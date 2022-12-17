import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmsscoringfixedfieldsnegativeListComponent } from './lmsscoringfixedfieldsnegative.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'lmsscoringfixedfieldsnegativelists', children: [
      { path: '', component: lmsscoringfixedfieldsnegativeListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: lmsscoringfixedfieldsnegativeListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
