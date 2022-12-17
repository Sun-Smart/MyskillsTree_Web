import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { qygrievancemasterComponent } from './qygrievancemaster.component';

const routes: Routes = [
  {
    path: 'qygrievancemasters', children: [
      { path: '', component: qygrievancemasterComponent },
      { path: 'edit/:id', component: qygrievancemasterComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
