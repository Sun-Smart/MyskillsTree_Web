import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boholidaylistComponent } from './boholidaylist.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'boholidaylists', children: [
      { path: '', component: boholidaylistComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: boholidaylistComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
