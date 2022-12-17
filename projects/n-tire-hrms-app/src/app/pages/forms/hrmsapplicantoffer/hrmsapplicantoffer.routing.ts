import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsapplicantofferComponent } from './hrmsapplicantoffer.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsapplicantoffers', children: [
      { path: '', component: hrmsapplicantofferComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsapplicantofferComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
