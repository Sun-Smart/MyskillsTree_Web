import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { cmsarticleComponent } from './cmsarticle.component';

const routes: Routes = [
  {
    path: 'cmsarticles', children: [
      { path: '', component: cmsarticleComponent },
      { path: 'edit/:id', component: cmsarticleComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
