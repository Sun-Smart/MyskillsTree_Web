import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { pmselectkpiComponent } from './pmselectkpi.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'pmselectkpis', children: [
      { path: '', component: pmselectkpiComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: pmselectkpiComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
