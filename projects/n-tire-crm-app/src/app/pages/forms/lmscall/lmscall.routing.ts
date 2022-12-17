import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { lmscallComponent } from './lmscall.component';

const routes: Routes = [
  {
    path: 'lmscalls', children: [
      { path: '', component: lmscallComponent },
      { path: 'edit/:id', component: lmscallComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
