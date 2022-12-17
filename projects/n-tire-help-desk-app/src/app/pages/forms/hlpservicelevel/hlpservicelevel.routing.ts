import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hlpservicelevelComponent } from './hlpservicelevel.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hlpservicelevels', children: [
      { path: '', component: hlpservicelevelComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hlpservicelevelComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
