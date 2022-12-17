import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { prjprojectdeliverableComponent } from './prjprojectdeliverable.component';

const routes: Routes = [
  {
    path: 'prjprojectdeliverables', children: [
      { path: '', component: prjprojectdeliverableComponent },
      { path: 'edit/:id', component: prjprojectdeliverableComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
