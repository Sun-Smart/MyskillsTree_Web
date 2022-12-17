import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bomodulehelpComponent } from './bomodulehelp.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bomodulehelps', children: [
      { path: '', component: bomodulehelpComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bomodulehelpComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bomodulehelpComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
