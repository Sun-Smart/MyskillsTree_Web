import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { camspmscheduleComponent } from './camspmschedule.component';

const routes: Routes = [
  {
    path: 'camspmschedules', children: [
      { path: '', component: camspmscheduleComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camspmscheduleComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: camspmscheduleComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
