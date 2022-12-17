import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bocompanysettingComponent } from './bocompanysetting.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bocompanysettings', children: [
      { path: '', component: bocompanysettingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bocompanysettingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bocompanysettingComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
