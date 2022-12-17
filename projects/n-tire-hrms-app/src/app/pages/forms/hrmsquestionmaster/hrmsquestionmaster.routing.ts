import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsquestionmasterListComponent } from './hrmsquestionmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsquestionmasters', children: [
      { path: '', component: hrmsquestionmasterListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsquestionmasterListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
