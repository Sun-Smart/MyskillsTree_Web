import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bodatamaskingComponent } from './bodatamasking.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bodatamaskings', children: [
      { path: '', component: bodatamaskingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bodatamaskingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bodatamaskingComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
