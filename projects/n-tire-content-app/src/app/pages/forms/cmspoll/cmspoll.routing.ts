import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { cmspollComponent } from './cmspoll.component';

const routes: Routes = [
  {
    path: 'cmspolls', children: [
      { path: '', component: cmspollComponent },
      { path: 'edit/:id', component: cmspollComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
