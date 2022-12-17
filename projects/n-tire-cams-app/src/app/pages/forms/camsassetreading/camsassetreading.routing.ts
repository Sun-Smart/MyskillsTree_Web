import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { camsassetreadingComponent } from './camsassetreading.component';

const routes: Routes = [
  {
    path: 'camsassetreadings', children: [
      { path: '', component: camsassetreadingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camsassetreadingComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: camsassetreadingComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
