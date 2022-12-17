import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { camsassetmasterComponent } from './camsassetmaster.component';

const routes: Routes = [
  {
    path: 'camsassetmasters', children: [
      { path: '', component: camsassetmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camsassetmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: camsassetmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
