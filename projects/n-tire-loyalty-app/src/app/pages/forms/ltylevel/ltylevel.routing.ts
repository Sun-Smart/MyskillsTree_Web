import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ltylevelComponent } from './ltylevel.component';

const routes: Routes = [
  {
    path: 'ltylevels', children: [
      { path: '', component: ltylevelComponent },
      { path: 'edit/:id', component: ltylevelComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
