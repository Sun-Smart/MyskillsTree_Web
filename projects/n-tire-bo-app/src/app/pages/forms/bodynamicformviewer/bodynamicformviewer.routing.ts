import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bodynamicformviewerComponent } from './bodynamicformviewer.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bodynamicformviewers', children: [
      { path: '', component: bodynamicformviewerComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bodynamicformviewerComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bodynamicformviewerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
