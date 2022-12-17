import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boreportComponent } from './boreport.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';

const routes: Routes = [
  {
    path: 'boreports', children: [
      { path: '', component: boreportComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: boreportComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: boreportComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
