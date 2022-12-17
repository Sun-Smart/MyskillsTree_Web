import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erprfqdetailComponent } from './erprfqdetail.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'erprfqdetails', children: [
      { path: '', component: erprfqdetailComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: erprfqdetailComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
