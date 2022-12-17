import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ltysegmentComponent } from './ltysegment.component';

const routes: Routes = [
  {
    path: 'ltysegments', children: [
      { path: '', component: ltysegmentComponent },
      { path: 'edit/:id', component: ltysegmentComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
