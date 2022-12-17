import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { umsquestioncategoryComponent } from './umsquestioncategory.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'umsquestioncategories', children: [
      { path: '', component: umsquestioncategoryComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: umsquestioncategoryComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
