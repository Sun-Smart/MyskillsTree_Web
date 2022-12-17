import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { pmspropertyComponent } from './pmsproperty.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'pmsproperties', children: [
      { path: '', component: pmspropertyComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: pmspropertyComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
