import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { erpcontractclauseComponent } from './erpcontractclause.component';

const routes: Routes = [
  {
    path: 'erpcontractclauses', children: [
      { path: '', component: erpcontractclauseComponent },
      { path: 'edit/:id', component: erpcontractclauseComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
