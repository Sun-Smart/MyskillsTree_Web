import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmstamssettingComponent } from './hrmstamssetting.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmstamssettings', children: [
      { path: '', component: hrmstamssettingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmstamssettingComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
