import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ltylistComponent } from './ltylist.component';

const routes: Routes = [
  {
    path: 'ltylists', children: [
      { path: '', component: ltylistComponent },
      { path: 'edit/:id', component: ltylistComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
