import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { flmusageComponent } from './flmusage.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'flmusages', children: [
      { path: '', component: flmusageComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: flmusageComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
