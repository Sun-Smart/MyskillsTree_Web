import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsletterrequestComponent } from './hrmsletterrequest.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsletterrequests', children: [
      { path: '', component: hrmsletterrequestComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsletterrequestComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
