import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { camsassetadditionComponent } from './camsassetaddition.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'camsassetadditions', children: [
      { path: '', component: camsassetadditionComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camsassetadditionComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: camsassetadditionComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
