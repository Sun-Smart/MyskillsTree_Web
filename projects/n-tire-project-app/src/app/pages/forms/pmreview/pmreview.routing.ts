import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { pmreviewComponent } from './pmreview.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'pmreviews', children: [
      { path: '', component: pmreviewComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: pmreviewComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
