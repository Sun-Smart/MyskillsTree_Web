import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsmanpowerrequestComponent } from './hrmsmanpowerrequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsmanpowerrequests', children: [
      { path: '', component: hrmsmanpowerrequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsmanpowerrequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: hrmsmanpowerrequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
