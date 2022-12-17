import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boganttComponent } from './bogantt.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bogantts', children: [
      { path: '', component: boganttComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: boganttComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: boganttComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
