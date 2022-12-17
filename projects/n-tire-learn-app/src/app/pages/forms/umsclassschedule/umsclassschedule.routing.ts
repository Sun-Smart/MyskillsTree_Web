import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { umsclassscheduleComponent } from './umsclassschedule.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'umsclassschedules', children: [
      { path: '', component: umsclassscheduleComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: umsclassscheduleComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
