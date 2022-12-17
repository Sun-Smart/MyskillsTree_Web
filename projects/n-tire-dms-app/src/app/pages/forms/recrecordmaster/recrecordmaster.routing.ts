import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { recrecordmasterComponent } from './recrecordmaster.component';

const routes: Routes = [
  {
    path: 'recrecordmasters', children: [
      { path: '', component: recrecordmasterComponent },
      { path: 'edit/:id', component: recrecordmasterComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
