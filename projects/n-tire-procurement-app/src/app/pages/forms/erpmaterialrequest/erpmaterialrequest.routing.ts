import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpmaterialrequestComponent } from './erpmaterialrequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erpmaterialrequests', children: [
      { path: '', component: erpmaterialrequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erpmaterialrequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
