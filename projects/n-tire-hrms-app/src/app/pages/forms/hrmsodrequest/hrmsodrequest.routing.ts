import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsodrequestComponent } from './hrmsodrequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsodrequests', children: [
      { path: '', component: hrmsodrequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsodrequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
