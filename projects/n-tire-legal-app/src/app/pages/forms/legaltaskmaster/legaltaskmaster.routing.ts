import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { legaltaskmasterComponent } from './legaltaskmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'legaltaskmasters', children: [
      { path: '', component: legaltaskmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: legaltaskmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
