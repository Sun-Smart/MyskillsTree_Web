import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bomasterdataComponent } from './bomasterdata.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bomasterdatas', children: [
      { path: '', component: bomasterdataComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bomasterdataComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bomasterdataComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
