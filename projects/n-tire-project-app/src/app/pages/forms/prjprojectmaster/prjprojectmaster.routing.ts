import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../../../../../../n-tire-bo-app/src/app/pages/common/unsaved-changes';
import { prjprojectmasterComponent } from './prjprojectmaster.component';

const routes: Routes = [
  {
    path: 'prjprojectmasters', children: [
      { path: '', component: prjprojectmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: prjprojectmasterComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'view/:viewid', component: prjprojectmasterComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
