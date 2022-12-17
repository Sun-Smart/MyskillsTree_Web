import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { umsstudentfeedbackComponent } from './umsstudentfeedback.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'umsstudentfeedbacks', children: [
      { path: '', component: umsstudentfeedbackComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: umsstudentfeedbackComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
