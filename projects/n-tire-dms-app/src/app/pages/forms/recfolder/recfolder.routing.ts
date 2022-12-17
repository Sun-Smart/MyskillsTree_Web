import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { recfolderComponent } from './recfolder.component';

const routes: Routes = [
  {
    path: 'recfolders', children: [
      { path: '', component: recfolderComponent },
      { path: 'edit/:id', component: recfolderComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
