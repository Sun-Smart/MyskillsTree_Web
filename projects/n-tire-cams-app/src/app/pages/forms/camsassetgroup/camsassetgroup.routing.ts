import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { camsassetgroupComponent } from './camsassetgroup.component';

const routes: Routes = [
  {
    path: 'camsassetgroups', children: [
      { path: '', component: camsassetgroupComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camsassetgroupComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: camsassetgroupComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
