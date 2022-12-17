import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { systemcolumnComponent } from './systemcolumn.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'systemcolumns', children: [
      { path: '', component: systemcolumnComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: systemcolumnComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
