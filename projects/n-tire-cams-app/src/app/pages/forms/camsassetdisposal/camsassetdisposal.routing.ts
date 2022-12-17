import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { camsassetdisposalComponent } from './camsassetdisposal.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'camsassetdisposals', children: [
      { path: '', component: camsassetdisposalComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camsassetdisposalComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: camsassetdisposalComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
