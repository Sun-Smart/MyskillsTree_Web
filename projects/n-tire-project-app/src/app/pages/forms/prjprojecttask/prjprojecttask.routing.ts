import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { prjprojecttaskComponent } from './prjprojecttask.component';

const routes: Routes = [
  {
    path: 'prjprojecttasks', children: [
      { path: '', component: prjprojecttaskComponent },
      { path: 'edit/:id', component: prjprojecttaskComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
