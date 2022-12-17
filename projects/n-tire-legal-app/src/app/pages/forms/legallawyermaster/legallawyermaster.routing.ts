import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { legallawyermasterComponent } from './legallawyermaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'legallawyermasters', children: [
      { path: '', component: legallawyermasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: legallawyermasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
