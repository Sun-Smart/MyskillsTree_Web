import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { prjdailystandupComponent } from './prjdailystandup.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'prjdailystandups', children: [
      { path: '', component: prjdailystandupComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: prjdailystandupComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
