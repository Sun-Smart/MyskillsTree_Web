import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmsscoringfixedfieldspositiveListComponent } from './lmsscoringfixedfieldspositive.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'lmsscoringfixedfieldspositivelists', children: [
      { path: '', component: lmsscoringfixedfieldspositiveListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: lmsscoringfixedfieldspositiveListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
