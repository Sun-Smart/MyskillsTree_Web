import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boemailComponent } from './boemail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';

const routes: Routes = [
  {
    path: 'boemails', children: [
      { path: '', component: boemailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: boemailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: boemailComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
