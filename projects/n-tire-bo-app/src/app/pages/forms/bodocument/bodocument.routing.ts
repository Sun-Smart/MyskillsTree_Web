import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bodocumentComponent } from './bodocument.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'bodocuments', children: [
      { path: '', component: bodocumentComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bodocumentComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bodocumentComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
