import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmsscoringplannedclosedateListComponent } from './lmsscoringplannedclosedate.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'lmsscoringplannedclosedatelists', children: [
      { path: '', component: lmsscoringplannedclosedateListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: lmsscoringplannedclosedateListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
