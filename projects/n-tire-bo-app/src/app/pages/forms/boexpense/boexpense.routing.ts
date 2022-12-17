import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { boexpenseComponent } from './boexpense.component';

const routes: Routes = [
  {
    path: 'boexpenses', children: [
      { path: '', component: boexpenseComponent },
      { path: 'edit/:id', component: boexpenseComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
