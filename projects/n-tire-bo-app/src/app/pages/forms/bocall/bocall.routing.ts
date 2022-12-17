import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bocallComponent } from './bocall.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';

const routes: Routes = [
  {
    path: 'bocalls', children: [
      { path: '', component: bocallComponent },
      { path: 'edit/:id', component: bocallComponent },
      { path: 'view/:viewid', component: bocallComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
