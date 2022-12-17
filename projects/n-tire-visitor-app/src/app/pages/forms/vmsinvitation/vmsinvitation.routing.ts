import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vmsinvitationComponent } from './vmsinvitation.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'vmsinvitations', children: [
      { path: '', component: vmsinvitationComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: vmsinvitationComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
