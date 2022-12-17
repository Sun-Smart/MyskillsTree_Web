import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { prjprojectobjectiveComponent } from './prjprojectobjective.component';

const routes: Routes = [
  {
    path: 'prjprojectobjectives', children: [
      { path: '', component: prjprojectobjectiveComponent },
      { path: 'edit/:id', component: prjprojectobjectiveComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
