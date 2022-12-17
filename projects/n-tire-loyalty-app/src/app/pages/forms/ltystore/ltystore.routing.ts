import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ltystoreComponent } from './ltystore.component';

const routes: Routes = [
  {
    path: 'ltystores', children: [
      { path: '', component: ltystoreComponent },
      { path: 'edit/:id', component: ltystoreComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
