import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { camspmmasterComponent } from './camspmmaster.component';

const routes: Routes = [
  {
    path: 'camspmmasters', children: [
      { path: '', component: camspmmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camspmmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: camspmmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
