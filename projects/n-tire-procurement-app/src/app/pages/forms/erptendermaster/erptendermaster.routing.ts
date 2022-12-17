import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erptendermasterComponent } from './erptendermaster.component';

const routes: Routes = [
  {
    path: 'erptendermasters', children: [
      { path: '', component: erptendermasterComponent },
      { path: 'edit/:id', component: erptendermasterComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
