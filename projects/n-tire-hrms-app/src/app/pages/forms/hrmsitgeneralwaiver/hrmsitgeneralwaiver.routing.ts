import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { hrmsitgeneralwaiverComponent } from './hrmsitgeneralwaiver.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'hrmsitgeneralwaivers', children: [
      { path: '', component: hrmsitgeneralwaiverComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: hrmsitgeneralwaiverComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
