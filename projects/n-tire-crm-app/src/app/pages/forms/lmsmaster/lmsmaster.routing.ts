import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmsmasterComponent } from './lmsmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';


const routes: Routes = [
  {
    path: 'lmsmasters', children: [
      { path: '', component: lmsmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: lmsmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'show/:showformtype/:id', component: lmsmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
