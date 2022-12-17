import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmstargetuserlevelListComponent } from './lmstargetuserlevel.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'lmstargetuserlevellists', children: [
      { path: '', component: lmstargetuserlevelListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: ':id', component: lmstargetuserlevelListComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: lmstargetuserlevelListComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
