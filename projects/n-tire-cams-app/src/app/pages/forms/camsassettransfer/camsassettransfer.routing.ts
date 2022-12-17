import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { camsassettransferComponent } from './camsassettransfer.component';

const routes: Routes = [
  {
    path: 'camsassettransfers', children: [
      { path: '', component: camsassettransferComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: camsassettransferComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: camsassettransferComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
