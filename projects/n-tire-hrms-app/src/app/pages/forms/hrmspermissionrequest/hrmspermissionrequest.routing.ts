import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmspermissionrequestComponent } from './hrmspermissionrequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmspermissionrequests', children: [
      { path: '', component: hrmspermissionrequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmspermissionrequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
