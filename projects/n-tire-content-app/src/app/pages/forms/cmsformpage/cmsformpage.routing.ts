import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { cmsformpageComponent } from './cmsformpage.component';

const routes: Routes = [
  {
    path: 'cmsformpages', children: [
      { path: '', component: cmsformpageComponent },
      { path: 'edit/:id', component: cmsformpageComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
