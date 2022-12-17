import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { botableconfigurationComponent } from './botableconfiguration.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'botableconfigurations', children: [
      { path: '', component: botableconfigurationComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: botableconfigurationComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: botableconfigurationComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
