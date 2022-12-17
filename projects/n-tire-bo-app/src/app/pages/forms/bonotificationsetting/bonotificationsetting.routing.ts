import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bonotificationsettingComponent } from './bonotificationsetting.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bonotificationsettings', children: [
      { path: '', component: bonotificationsettingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bonotificationsettingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bonotificationsettingComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
