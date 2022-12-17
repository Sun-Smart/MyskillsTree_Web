import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { cmsblogComponent } from './cmsblog.component';

const routes: Routes = [
  {
    path: 'cmsblogs', children: [
      { path: '', component: cmsblogComponent },
      { path: 'edit/:id', component: cmsblogComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
