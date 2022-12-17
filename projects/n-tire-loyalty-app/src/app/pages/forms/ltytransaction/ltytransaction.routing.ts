import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ltytransactionComponent } from './ltytransaction.component';

const routes: Routes = [
  {
    path: 'ltytransactions', children: [
      { path: '', component: ltytransactionComponent },
      { path: 'edit/:id', component: ltytransactionComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
