import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { pmspropertyownerComponent } from './pmspropertyowner.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'pmspropertyowners', children: [
      { path: '', component: pmspropertyownerComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: pmspropertyownerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
