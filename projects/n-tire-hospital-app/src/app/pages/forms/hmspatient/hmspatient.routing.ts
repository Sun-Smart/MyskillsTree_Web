import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hmspatientComponent } from './hmspatient.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hmspatients', children: [
      { path: '', component: hmspatientComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hmspatientComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
