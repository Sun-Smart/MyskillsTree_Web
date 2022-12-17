import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsleaverequestComponent } from './hrmsleaverequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsleaverequests', children: [
      { path: '', component: hrmsleaverequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsleaverequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
