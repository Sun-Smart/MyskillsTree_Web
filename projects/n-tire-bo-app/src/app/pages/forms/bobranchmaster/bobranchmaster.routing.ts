import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bobranchmasterComponent } from './bobranchmaster.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';


const routes: Routes = [
  {
    path: 'bobranchmasters', children: [
      { path: '', component: bobranchmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: bobranchmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: bobranchmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
