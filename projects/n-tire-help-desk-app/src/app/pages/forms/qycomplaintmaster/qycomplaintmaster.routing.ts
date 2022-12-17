import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { qycomplaintmasterComponent } from './qycomplaintmaster.component';

const routes: Routes = [
  {
    path: 'qycomplaintmasters', children: [
      { path: '', component: qycomplaintmasterComponent },
      { path: 'edit/:id', component: qycomplaintmasterComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
