import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bouserrolemasterComponent } from './bouserrolemaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bouserrolemasters', children: [
      { path: '', component: bouserrolemasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bouserrolemasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bouserrolemasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
