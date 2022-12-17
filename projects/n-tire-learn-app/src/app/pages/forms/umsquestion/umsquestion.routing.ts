import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { umsquestionComponent } from './umsquestion.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'umsquestions', children: [
      { path: '', component: umsquestionComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: umsquestionComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
