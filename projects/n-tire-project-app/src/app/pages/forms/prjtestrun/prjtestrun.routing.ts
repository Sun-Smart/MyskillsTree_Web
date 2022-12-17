import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { prjtestrunComponent } from './prjtestrun.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'prjtestruns', children: [
      { path: '', component: prjtestrunComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: prjtestrunComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
