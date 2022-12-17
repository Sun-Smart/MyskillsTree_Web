import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsemployeetaxcalculationComponent } from './hrmsemployeetaxcalculation.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsemployeetaxcalculations', children: [
      { path: '', component: hrmsemployeetaxcalculationComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsemployeetaxcalculationComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
