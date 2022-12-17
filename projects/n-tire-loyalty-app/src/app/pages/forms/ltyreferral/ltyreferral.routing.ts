import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ltyreferralComponent } from './ltyreferral.component';

const routes: Routes = [
  {
    path: 'ltyreferrals', children: [
      { path: '', component: ltyreferralComponent },
      { path: 'edit/:id', component: ltyreferralComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
