import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boconfigvalueComponent } from './boconfigvalue.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'boconfigvalues', children: [
      { path: '', component: boconfigvalueComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: boconfigvalueComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: boconfigvalueComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
