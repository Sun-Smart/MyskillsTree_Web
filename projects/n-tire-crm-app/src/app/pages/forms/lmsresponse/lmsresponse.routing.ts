import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmsresponseComponent } from './lmsresponse.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'lmsresponses', children: [
      { path: '', component: lmsresponseComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: lmsresponseComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
