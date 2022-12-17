import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hmsdoctorComponent } from './hmsdoctor.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hmsdoctors', children: [
      { path: '', component: hmsdoctorComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hmsdoctorComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
