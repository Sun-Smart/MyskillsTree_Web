import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsinductionmasterComponent } from './hrmsinductionmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [

  {
    path: 'hrmsinductionmaster', children: [
      { path: '', component: hrmsinductionmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsinductionmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
