import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmscampaignmasterComponent } from './lmscampaignmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'lmscampaignmasters', children: [
      { path: '', component: lmscampaignmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: lmscampaignmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
