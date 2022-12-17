import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmssectionwaiverComponent } from './hrmssectionwaiver.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmssectionwaivers', children: [
      { path: '', component: hrmssectionwaiverComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmssectionwaiverComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
