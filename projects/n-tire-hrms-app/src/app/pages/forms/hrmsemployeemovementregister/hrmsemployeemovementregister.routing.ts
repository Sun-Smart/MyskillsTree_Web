import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsemployeemovementregisterComponent } from './hrmsemployeemovementregister.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsemployeemovementregisters', children: [
      { path: '', component: hrmsemployeemovementregisterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsemployeemovementregisterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
