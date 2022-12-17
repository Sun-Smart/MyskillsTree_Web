import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { camsworkorderComponent } from './camsworkorder.component';

const routes: Routes = [
  {
    path: 'camsworkorders', children: [
      { path: '', component: camsworkorderComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camsworkorderComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: camsworkorderComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
