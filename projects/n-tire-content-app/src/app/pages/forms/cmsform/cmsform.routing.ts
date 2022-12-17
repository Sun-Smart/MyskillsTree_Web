import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { cmsformComponent } from './cmsform.component';

const routes: Routes = [
  {
    path: 'cmsforms', children: [
      { path: '', component: cmsformComponent },
      { path: 'edit/:id', component: cmsformComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
