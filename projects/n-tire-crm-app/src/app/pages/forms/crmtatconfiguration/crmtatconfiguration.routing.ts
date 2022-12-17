import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { crmtatconfigurationComponent } from './crmtatconfiguration.component';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'crmtatconfigurations', children: [
      { path: '', component: crmtatconfigurationComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: crmtatconfigurationComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
