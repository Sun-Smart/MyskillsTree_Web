import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bocontactComponent } from './bocontact.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bocontacts', children: [
      { path: '', component: bocontactComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bocontactComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bocontactComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
