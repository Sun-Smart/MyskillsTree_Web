import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { prjexpenseComponent } from './prjexpense.component';

const routes: Routes = [
  {
    path: 'prjexpenses', children: [
      { path: '', component: prjexpenseComponent },
      { path: 'edit/:id', component: prjexpenseComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
