import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bofaqComponent } from './bofaq.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bofaqs', children: [
      { path: '', component: bofaqComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bofaqComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bofaqComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
