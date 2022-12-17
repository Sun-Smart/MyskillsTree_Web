import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vmsvisitorComponent } from './vmsvisitor.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'vmsvisitors', children: [
      { path: '', component: vmsvisitorComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: vmsvisitorComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
